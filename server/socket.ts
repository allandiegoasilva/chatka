import type { Server, Socket } from "socket.io";
import {
  endMatch,
  ensureUser,
  getMatch,
  getMatchByUserId,
  getPeerUserId,
  getUser,
  joinQueue,
  leaveQueue,
  onlineCount,
  setUserOffline,
  setUserSocket,
  toRemoteUser,
  tryCreateMatch,
  type CreatedMatch,
} from "./store";

type SignalingPayload = {
  matchId?: string;
  userId?: string;
  offer?: unknown;
  answer?: unknown;
  candidate?: unknown;
  message?: string;
  isTyping?: boolean;
};

type QueueJoinPayload = {
  matchType?: string;
  filterCountry?: string | null;
};

function queryValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function findMatch(userId: string, matchId?: string) {
  if (matchId) {
    const match = getMatch(matchId);
    if (match?.userIds.includes(userId)) {
      return match;
    }
  }

  return getMatchByUserId(userId);
}

function emitToUser(
  nsp: ReturnType<Server["of"]>,
  userId: string,
  event: string,
  payload?: unknown,
) {
  const user = getUser(userId);
  if (!user?.socketId) {
    return;
  }

  nsp.to(user.socketId).emit(event, payload);
}

function emitMatchFound(
  nsp: ReturnType<Server["of"]>,
  created: CreatedMatch,
) {
  emitToUser(nsp, created.userA.id, "match:found", {
    matchId: created.match.id,
    startOffer: true,
    userRemote: toRemoteUser(created.userB),
  });

  emitToUser(nsp, created.userB.id, "match:found", {
    matchId: created.match.id,
    startOffer: false,
    userRemote: toRemoteUser(created.userA),
  });
}

function notifyMatchEnded(nsp: ReturnType<Server["of"]>, userIds: string[]) {
  userIds.forEach((userId) => {
    emitToUser(nsp, userId, "match:ended");
  });
}

function relayToPeer(
  nsp: ReturnType<Server["of"]>,
  userId: string,
  matchId: string | undefined,
  event: string,
  payload: unknown,
) {
  const match = findMatch(userId, matchId);
  if (!match) {
    return;
  }

  const peerId = getPeerUserId(match.id, userId);
  if (!peerId) {
    return;
  }

  emitToUser(nsp, peerId, event, payload);
}

function tryMatch(nsp: ReturnType<Server["of"]>) {
  const created = tryCreateMatch();
  if (created) {
    emitMatchFound(nsp, created);
  }
}

export function attachSocket(io: Server) {
  const nsp = io.of("/socket");

  nsp.on("connection", (socket: Socket) => {
    const clientId = queryValue(socket.handshake.query.clientId);
    if (!clientId) {
      socket.disconnect(true);
      return;
    }

    const user = ensureUser(clientId);
    if (user.socketId && user.socketId !== socket.id) {
      nsp.sockets.get(user.socketId)?.disconnect(true);
    }

    setUserSocket(user.id, socket.id);

    socket.on("queue:join", (payload?: QueueJoinPayload) => {
      joinQueue(user.id, {
        matchType: payload?.matchType,
        filterCountry: payload?.filterCountry,
      });
      tryMatch(nsp);
    });

    socket.on("match:next", (payload?: SignalingPayload) => {
      const match = findMatch(user.id, payload?.matchId);
      if (!match) {
        joinQueue(user.id);
        tryMatch(nsp);
        return;
      }

      const userIds = endMatch(match.id);
      notifyMatchEnded(nsp, userIds);
    });

    socket.on("match:offer", (payload?: SignalingPayload) => {
      relayToPeer(nsp, user.id, payload?.matchId, "match:offer", payload?.offer);
    });

    socket.on("match:answer", (payload?: SignalingPayload) => {
      relayToPeer(
        nsp,
        user.id,
        payload?.matchId,
        "match:answer",
        payload?.answer,
      );
    });

    socket.on("match:candidate", (payload?: SignalingPayload) => {
      relayToPeer(
        nsp,
        user.id,
        payload?.matchId,
        "match:candidate",
        payload?.candidate,
      );
    });

    socket.on("chat:send", (payload?: SignalingPayload) => {
      relayToPeer(nsp, user.id, payload?.matchId, "chat:message", {
        message: payload?.message ?? "",
      });
    });

    socket.on("chat:typing", (payload?: SignalingPayload) => {
      relayToPeer(nsp, user.id, payload?.matchId, "chat:typing", {
        isTyping: Boolean(payload?.isTyping),
      });
    });

    socket.on("users:stats", (callback?: (stats: { total: number }) => void) => {
      if (typeof callback === "function") {
        callback({ total: onlineCount() });
      }
    });

    socket.on("disconnect", () => {
      const current = getUser(user.id);
      if (!current || current.socketId !== socket.id) {
        return;
      }

      const match = getMatchByUserId(user.id);
      if (match) {
        const userIds = endMatch(match.id);
        notifyMatchEnded(
          nsp,
          userIds.filter((id) => id !== user.id),
        );
      }

      leaveQueue(user.id);
      setUserOffline(user.id, socket.id);
    });
  });
}
