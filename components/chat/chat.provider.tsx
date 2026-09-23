"use client";

import { MatchFoundDto } from "@/backend/match/match-found.dto";
import { MatchType } from "@/backend/match/match-type.enum";
import { userGetIdAction } from "@/backend/user/actions/user-get-id.action";
import { userSaveAction } from "@/backend/user/actions/user-save.action";
import { UserGender } from "@/backend/user/enum/user-gender.enum";
import { getLiveUserMedia, holdUserMedia, stopMediaStream } from "@/lib/media";
import { getSocket, socketConnect } from "@/lib/socket-client";
import { createWebrtcClient } from "@/lib/webrtc-client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

export enum ChatOrigin {
  LOCAL = "LOCAL",
  REMOTE = "REMOTE",
}

export enum ChatStatus {
  REQUIRE_PERMISSION = "REQUIRE_PERMISSION",
  WAITING = "WAITING",
  CONNECTED = "CONNECTED",
}

export type ChatMetadata = {
  status: ChatStatus;
  matchId?: string;
  userId?: string;
  isConnected: boolean;
  webRTCStatus?: string;
  remoteStreamUpdated?: number;
  userRemote: {
    username: string;
    gender: UserGender;
    countryCode: string | null;
    state: string | null;
  };
};

export type MatchFilters = {
  filterGender: UserGender | null;
  matchType: MatchType;
  filterCountry: string | null;
};

export type ChatContextProps = {
  changeChat(metadata: Partial<ChatMetadata>): void;
  metadata: ChatMetadata;
  filters: MatchFilters;
  setFilters(input: Partial<MatchFilters>): void;
  localStream: RefObject<MediaStream | null>;
  remoteStream: RefObject<MediaStream | null>;
  receivedTrackStream: number;
  localStreamVersion: number;
  setLocalMedia(stream: MediaStream): void;
};

const ChatContext = createContext({});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const webRTCRef = useRef<RTCPeerConnection | null>(null);
  const userIdRef = useRef<string | undefined>(undefined);
  const matchIdRef = useRef<string | undefined>(undefined);
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
  const connectWatchRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skippedMatchRef = useRef<string | undefined>(undefined);

  const [metadata, setMetadata] = useState<
    Omit<ChatMetadata, "localStream" | "remoteStream">
  >({
    status: ChatStatus.REQUIRE_PERMISSION,
    isConnected: false,
    userRemote: {
      username: "",
      gender: UserGender.MALE,
      countryCode: null,
      state: null,
    },
  });

  const [receivedTrackStream, setReceivedTrackStream] = useState<number>(0);
  const [localStreamVersion, setLocalStreamVersion] = useState(0);
  const [filters, setFiltersState] = useState<MatchFilters>({
    filterGender: null,
    matchType: MatchType.WORLD,
    filterCountry: null,
  });

  function setFilters(input: Partial<MatchFilters>) {
    setFiltersState((current) => ({
      ...current,
      ...input,
    }));
  }

  function setLocalMedia(stream: MediaStream) {
    if (localStreamRef.current && localStreamRef.current !== stream) {
      stopMediaStream(localStreamRef.current);
    }

    localStreamRef.current = stream;
    holdUserMedia(stream);
    setLocalStreamVersion((current) => current + 1);

    const pc = webRTCRef.current;
    if (!pc) {
      return;
    }

    stream.getTracks().forEach((track) => {
      const sender = pc.getSenders().find((item) => item.track?.kind === track.kind);
      if (sender) {
        sender.replaceTrack(track);
        return;
      }

      pc.addTrack(track, stream);
    });
  }

  function changeChat(input: Partial<ChatMetadata>) {
    if (input.matchId !== undefined) {
      matchIdRef.current = input.matchId;
    }
    if (input.userId !== undefined) {
      userIdRef.current = input.userId;
    }

    setMetadata((prev) => ({
      ...prev,
      ...input,
    }));
  }

  function clearConnectWatch() {
    if (connectWatchRef.current) {
      clearTimeout(connectWatchRef.current);
      connectWatchRef.current = null;
    }
  }

  function isPeerConnected(pc: RTCPeerConnection) {
    const ice = pc.iceConnectionState;
    return (
      pc.connectionState === "connected" ||
      ice === "connected" ||
      ice === "completed"
    );
  }

  function skipCurrentMatch() {
    const matchId = matchIdRef.current;
    if (!matchId || skippedMatchRef.current === matchId) {
      return;
    }

    skippedMatchRef.current = matchId;
    clearConnectWatch();
    getSocket()?.emit("match:next", {
      matchId,
      userId: userIdRef.current,
    });
  }

  function startConnectWatch(matchId: string, pc: RTCPeerConnection) {
    clearConnectWatch();
    skippedMatchRef.current = undefined;

    const onState = () => {
      if (matchIdRef.current !== matchId) {
        return;
      }

      if (isPeerConnected(pc)) {
        clearConnectWatch();
        return;
      }

      if (pc.connectionState === "failed" || pc.iceConnectionState === "failed") {
        skipCurrentMatch();
      }
    };

    pc.addEventListener("connectionstatechange", onState);
    pc.addEventListener("iceconnectionstatechange", onState);

    connectWatchRef.current = setTimeout(() => {
      if (matchIdRef.current !== matchId) {
        return;
      }

      if (!isPeerConnected(pc)) {
        skipCurrentMatch();
      }
    }, 12_000);
  }

  async function flushPendingCandidates(pc: RTCPeerConnection) {
    if (!pc.remoteDescription) {
      return;
    }

    const pending = pendingCandidatesRef.current;
    pendingCandidatesRef.current = [];

    for (const candidate of pending) {
      await pc.addIceCandidate(candidate);
    }
  }

  async function listenEvents() {
    const socket = await socketConnect();

    if (!socket) {
      return;
    }

    changeChat({
      isConnected: true,
    });

    async function localWebRTCClient(startOffer: boolean, matchId: string) {
      if (!webRTCRef.current) {
        return;
      }

      localStreamRef.current?.getTracks().forEach((track) => {
        webRTCRef.current!.addTrack(
          track,
          localStreamRef.current as MediaStream,
        );
      });

      if (startOffer) {
        const offer = await webRTCRef.current.createOffer();
        await webRTCRef.current.setLocalDescription(offer);
        socket!.emit("match:offer", {
          matchId,
          userId: userIdRef.current,
          offer,
        });
      }
    }

    function eventWebRTCClient(matchId: string) {
      if (!webRTCRef.current) {
        return;
      }

      webRTCRef.current.ontrack = (event: RTCTrackEvent) => {
        remoteStreamRef.current = event.streams[0];
        setReceivedTrackStream((current) => (current === 0 ? 1 : current));
      };

      webRTCRef.current.onicecandidate = (
        event: RTCPeerConnectionIceEvent,
      ) => {
        if (event.candidate && socket) {
          socket.emit("match:candidate", {
            matchId,
            userId: userIdRef.current,
            candidate: event.candidate,
          });
        }
      };
    }

    socket.on("match:found", (match: MatchFoundDto) => {
      pendingCandidatesRef.current = [];
      changeChat({
        status: ChatStatus.CONNECTED,
        matchId: match.matchId,
        userRemote: {
          username: match.userRemote?.username,
          gender: match.userRemote?.gender,
          countryCode: match.userRemote?.countryCode,
          state: match.userRemote?.state,
        },
      });

      const pc = createWebrtcClient();
      webRTCRef.current = pc;

      localWebRTCClient(match.startOffer, match.matchId);
      eventWebRTCClient(match.matchId);
      startConnectWatch(match.matchId, pc);
    });

    socket.on("match:ended", () => {
      clearConnectWatch();
      skippedMatchRef.current = undefined;
      webRTCRef.current?.close();
      webRTCRef.current = null;
      remoteStreamRef.current = null;
      pendingCandidatesRef.current = [];
      matchIdRef.current = undefined;
      socket.emit("queue:join");
      changeChat({
        status: ChatStatus.WAITING,
        matchId: undefined,
        userRemote: {
          gender: UserGender.MALE,
          countryCode: null,
          state: null,
          username: "",
        },
      });

      setReceivedTrackStream(0);
    });

    socket.on("match:offer", async (offer) => {
      const pc = webRTCRef.current;
      if (!pc) {
        return;
      }

      await pc.setRemoteDescription(offer);
      await flushPendingCandidates(pc);

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket.emit("match:answer", {
        matchId: matchIdRef.current,
        userId: userIdRef.current,
        answer,
      });
    });

    socket.on("match:candidate", async (candidate) => {
      if (!candidate) {
        return;
      }

      const pc = webRTCRef.current;
      if (!pc) {
        return;
      }

      if (pc.remoteDescription) {
        await pc.addIceCandidate(candidate);
        return;
      }

      pendingCandidatesRef.current.push(candidate);
    });

    socket.on("match:answer", async (answer) => {
      const pc = webRTCRef.current;
      if (!pc) {
        return;
      }

      await pc.setRemoteDescription(answer);
      await flushPendingCandidates(pc);
    });
  }

  useEffect(() => {
    const live = getLiveUserMedia();
    if (!live) {
      return;
    }

    localStreamRef.current = live;
    holdUserMedia(live);
    setLocalStreamVersion((current) => current + 1);
  }, []);

  useEffect(() => {
    let active = true;

    async function boot() {
      await userSaveAction();
      const userId = await userGetIdAction();
      if (!active) {
        return;
      }

      userIdRef.current = userId;
      changeChat({
        userId,
      });

      await listenEvents();
    }

    boot();

    return () => {
      active = false;
      clearConnectWatch();
    };
  }, []);

  return (
    <ChatContext.Provider
      value={{
        changeChat,
        metadata,
        filters,
        setFilters,
        localStream: localStreamRef,
        remoteStream: remoteStreamRef,
        receivedTrackStream,
        localStreamVersion,
        setLocalMedia,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export function useChat(): ChatContextProps {
  return useContext(ChatContext) as ChatContextProps;
}
