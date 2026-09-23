import { randomBytes, randomUUID } from "node:crypto";
import { MatchType } from "../backend/match/match-type.enum";
import { UserType } from "../backend/user/enum/user-type.enum";
import { UserGender } from "../backend/user/enum/user-gender.enum";
import { UserDto } from "../backend/user/dtos/user.dto";

const PAIR_COOLDOWN_MS = 60_000;

const ADJECTIVES = [
  "Swift",
  "Calm",
  "Bright",
  "Quiet",
  "Lucky",
  "Bold",
  "Cool",
  "Kind",
  "Wild",
  "Nova",
];

const ANIMALS = [
  "Fox",
  "Panda",
  "Wolf",
  "Owl",
  "Tiger",
  "Bear",
  "Hawk",
  "Lynx",
  "Otter",
  "Koala",
];

export type StoredUser = {
  id: string;
  username: string;
  isOnline: boolean;
  type: UserType;
  socketId: string;
  gender: UserGender | null;
  countryCode: string | null;
  state: string | null;
  ip: string | null;
  matchType: MatchType;
  filterCountry: string | null;
  filterGender: UserGender | null;
  createdAt: Date;
  updatedAt: Date;
};

export type StoredMatch = {
  id: string;
  userIds: [string, string];
};

export type CreatedMatch = {
  match: StoredMatch;
  userA: StoredUser;
  userB: StoredUser;
};

export type UserSaveInput = {
  userId?: string;
  gender?: string;
  countryCode?: string | null;
  state?: string | null;
  ip?: string | null;
  matchType?: string;
  filterCountry?: string | null;
  filterGender?: string | null;
};

type ChatkaStore = {
  users: Map<string, StoredUser>;
  usernames: Set<string>;
  queue: string[];
  matches: Map<string, StoredMatch>;
  userMatch: Map<string, string>;
  recentPairs: Map<string, number>;
};

function createStore(): ChatkaStore {
  return {
    users: new Map(),
    usernames: new Set(),
    queue: [],
    matches: new Map(),
    userMatch: new Map(),
    recentPairs: new Map(),
  };
}

function getStore(): ChatkaStore {
  const globalState = globalThis as typeof globalThis & {
    __chatkaStore?: ChatkaStore;
  };

  if (!globalState.__chatkaStore) {
    globalState.__chatkaStore = createStore();
  }

  return globalState.__chatkaStore;
}

function parseMatchType(value?: string): MatchType {
  if (value === MatchType.COUNTRY) {
    return MatchType.COUNTRY;
  }

  return MatchType.WORLD;
}

function parseGender(value?: string): UserGender | null {
  if (value === "COUPLE") {
    return UserGender.OTHER;
  }

  if (
    value === UserGender.MALE ||
    value === UserGender.FEMALE ||
    value === UserGender.OTHER
  ) {
    return value;
  }

  return null;
}

function createUsername(): string {
  const store = getStore();

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    const suffix = randomBytes(2).toString("hex");
    const username = `${adjective}${animal}${suffix}`;

    if (!store.usernames.has(username)) {
      store.usernames.add(username);
      return username;
    }
  }

  const username = `Guest${randomBytes(4).toString("hex")}`;
  store.usernames.add(username);
  return username;
}

function pairKey(a: string, b: string): string {
  return [a, b].sort().join(":");
}

function isRecentPair(a: string, b: string): boolean {
  const store = getStore();
  const key = pairKey(a, b);
  const expiresAt = store.recentPairs.get(key);

  if (!expiresAt) {
    return false;
  }

  if (expiresAt <= Date.now()) {
    store.recentPairs.delete(key);
    return false;
  }

  return true;
}

function rememberPair(a: string, b: string) {
  const store = getStore();
  store.recentPairs.set(pairKey(a, b), Date.now() + PAIR_COOLDOWN_MS);
}

function isReady(user?: StoredUser): user is StoredUser {
  return Boolean(user?.isOnline && user.socketId);
}

function acceptsPeer(user: StoredUser, peer: StoredUser) {
  if (user.filterGender && peer.gender !== user.filterGender) {
    return false;
  }

  if (user.matchType !== MatchType.COUNTRY) {
    return true;
  }

  const wanted = user.filterCountry || user.countryCode;
  if (!wanted) {
    return false;
  }

  return peer.countryCode === wanted;
}

function canPair(first: StoredUser, second: StoredUser) {
  return acceptsPeer(first, second) && acceptsPeer(second, first);
}

export function saveUser(input: UserSaveInput = {}): StoredUser {
  const store = getStore();
  const now = new Date();
  const existing = input.userId ? store.users.get(input.userId) : undefined;

  if (existing) {
    const gender = parseGender(input.gender);
    if (gender) {
      existing.gender = gender;
    }
    if (input.countryCode !== undefined) {
      existing.countryCode = input.countryCode;
    }
    if (input.state !== undefined) {
      existing.state = input.state;
    }
    if (input.ip !== undefined) {
      existing.ip = input.ip;
    }
    if (input.matchType !== undefined) {
      existing.matchType = parseMatchType(input.matchType);
    }
    if (input.filterCountry !== undefined) {
      existing.filterCountry = input.filterCountry;
    }
    if (input.filterGender !== undefined) {
      existing.filterGender = parseGender(input.filterGender ?? undefined);
    }
    existing.updatedAt = now;
    return existing;
  }

  const user: StoredUser = {
    id: input.userId || randomUUID(),
    username: createUsername(),
    isOnline: false,
    type: UserType.ANONYMOUS,
    socketId: "",
    gender: parseGender(input.gender),
    countryCode: input.countryCode ?? null,
    state: input.state ?? null,
    ip: input.ip ?? null,
    matchType: parseMatchType(input.matchType),
    filterCountry: input.filterCountry ?? null,
    filterGender: parseGender(input.filterGender ?? undefined),
    createdAt: now,
    updatedAt: now,
  };

  store.users.set(user.id, user);
  return user;
}

export function getUser(id: string): StoredUser | undefined {
  return getStore().users.get(id);
}

export function ensureUser(id: string): StoredUser {
  return getUser(id) ?? saveUser({ userId: id });
}

export function setUserSocket(userId: string, socketId: string): StoredUser {
  const user = ensureUser(userId);
  user.socketId = socketId;
  user.isOnline = true;
  user.updatedAt = new Date();
  return user;
}

export function setUserOffline(userId: string, socketId: string) {
  const user = getUser(userId);
  if (!user || user.socketId !== socketId) {
    return;
  }

  user.isOnline = false;
  user.socketId = "";
  user.updatedAt = new Date();
}

export function joinQueue(
  userId: string,
  prefs?: Pick<UserSaveInput, "matchType" | "filterCountry" | "filterGender">,
) {
  if (prefs) {
    saveUser({
      userId,
      matchType: prefs.matchType,
      filterCountry: prefs.filterCountry,
      filterGender: prefs.filterGender,
    });
  }

  const store = getStore();
  if (store.userMatch.has(userId)) {
    return;
  }

  if (store.queue.includes(userId)) {
    return;
  }

  store.queue.push(userId);
}

export function leaveQueue(userId: string) {
  const store = getStore();
  store.queue = store.queue.filter((id) => id !== userId);
}

export function tryCreateMatch(): CreatedMatch | null {
  const store = getStore();

  for (let i = 0; i < store.queue.length; i += 1) {
    const firstId = store.queue[i];
    const first = getUser(firstId);

    if (!isReady(first)) {
      continue;
    }

    for (let j = i + 1; j < store.queue.length; j += 1) {
      const secondId = store.queue[j];
      const second = getUser(secondId);

      if (!isReady(second) || firstId === secondId) {
        continue;
      }

      if (isRecentPair(firstId, secondId)) {
        continue;
      }

      if (!canPair(first, second)) {
        continue;
      }

      store.queue = store.queue.filter(
        (id) => id !== firstId && id !== secondId,
      );

      const match: StoredMatch = {
        id: randomUUID(),
        userIds: [firstId, secondId],
      };

      store.matches.set(match.id, match);
      store.userMatch.set(firstId, match.id);
      store.userMatch.set(secondId, match.id);

      return {
        match,
        userA: first,
        userB: second,
      };
    }
  }

  return null;
}

export function getMatch(matchId: string): StoredMatch | undefined {
  return getStore().matches.get(matchId);
}

export function getMatchByUserId(userId: string): StoredMatch | undefined {
  const store = getStore();
  const matchId = store.userMatch.get(userId);
  if (!matchId) {
    return undefined;
  }

  return store.matches.get(matchId);
}

export function getPeerUserId(
  matchId: string,
  userId: string,
): string | undefined {
  const match = getMatch(matchId);
  if (!match) {
    return undefined;
  }

  return match.userIds.find((id) => id !== userId);
}

export function endMatch(matchId: string): string[] {
  const store = getStore();
  const match = store.matches.get(matchId);
  if (!match) {
    return [];
  }

  store.matches.delete(matchId);
  match.userIds.forEach((id) => store.userMatch.delete(id));
  rememberPair(match.userIds[0], match.userIds[1]);
  return [...match.userIds];
}

export function onlineCount(): number {
  let total = 0;
  for (const user of getStore().users.values()) {
    if (user.isOnline) {
      total += 1;
    }
  }
  return total;
}

export function toUserDto(user: StoredUser): UserDto {
  return {
    id: user.id,
    username: user.username,
    isOnline: user.isOnline,
    type: user.type,
    socketId: user.socketId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function toRemoteUser(user: StoredUser) {
  return {
    username: user.username,
    gender: user.gender ?? UserGender.MALE,
    countryCode: user.countryCode,
    state: user.state,
  };
}
