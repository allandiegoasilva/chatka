"use client";

import { MatchFoundDto } from "@/backend/match/match-found.dto";
import { userGetIdAction } from "@/backend/user/actions/user-get-id.action";
import { userSaveAction } from "@/backend/user/actions/user-save.action";
import { UserGender } from "@/backend/user/enum/user-gender.enum";
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

export type ChatContextProps = {
  changeChat(metadata: Partial<ChatMetadata>): void;
  metadata: ChatMetadata;
  localStream: RefObject<MediaStream | null>;
  remoteStream: RefObject<MediaStream | null>;
  receivedTrackStream: number;
};

const ChatContext = createContext({});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  let localStreamRef = useRef<MediaStream | null>(null);
  let remoteStreamRef = useRef<MediaStream | null>(null);
  let webRTCRef = useRef<RTCPeerConnection | null>(null);
  let userId: string | undefined;

  const [metadata, setMetadata] = useState<
    Omit<ChatMetadata, "localStream" | "remoteStream">
  >({
    status: ChatStatus.REQUIRE_PERMISSION,
    isConnected: false,
    remoteUser: {
      username: "",
      gender: UserGender.MALE,
      countryCode: null,
      state: null,
    },
  });

  const [receivedTrackStream, setReceivedTrackStream] = useState<number>(0);

  async function loadUserId() {
    await userSaveAction();
    userId = await userGetIdAction();
    changeChat({
      userId: userId,
    });
  }

  function changeChat(input: Partial<ChatMetadata>) {
    setMetadata({
      ...metadata,
      ...input,
    });
  }

  async function listenEvents() {
    const socket = await socketConnect();

    if (!socket) {
      return;
    }

    async function localWebRTCClient(startOffer: boolean) {
      if (!webRTCRef.current) {
        return;
      }

      localStreamRef.current?.getTracks().forEach((track) => {
        webRTCRef.current!.addTrack(
          track,
          localStreamRef.current as MediaStream,
        );
      });

      // INICIAR A OFFER SÓ DE UM LADO
      if (startOffer) {
        const offer = await webRTCRef.current!.createOffer();
        await webRTCRef.current!.setLocalDescription(offer);
        socket!.emit("match:offer", {
          matchId: metadata.matchId,
          userId: userId,
          offer,
        });
      }
    }

    function eventWebRTCClient() {
      if (!webRTCRef.current) {
        return;
      }

      webRTCRef.current!.ontrack = (event: RTCTrackEvent) => {
        remoteStreamRef.current = event.streams[0];
        if (receivedTrackStream === 0) {
          setReceivedTrackStream(receivedTrackStream + 1);
        }
      };

      webRTCRef.current!.onicecandidate = (
        event: RTCPeerConnectionIceEvent,
      ) => {
        if (event?.candidate && socket) {
          socket.emit("match:candidate", {
            matchId: metadata.matchId,
            userId: userId,
            candidate: event.candidate,
          });
        }
      };
    }

    socket.on("match:found", (match: MatchFoundDto) => {
      console.log(match);
      changeChat({
        status: ChatStatus.CONNECTED,
        matchId: match.matchId,
        remoteUser: {
          username: match.userRemote?.username,
          gender: match.userRemote?.gender,
          countryCode: match.userRemote?.countryCode,
          state: match.userRemote?.state,
        },
      });

      webRTCRef.current = createWebrtcClient();

      localWebRTCClient(match.startOffer);
      eventWebRTCClient();
    });

    socket.on("match:ended", () => {
      socket?.emit("queue:join");
      changeChat({
        status: ChatStatus.WAITING,
        remoteUser: {
          gender: UserGender.MALE,
          countryCode: null,
          state: null,
          username: "",
        },
      });

      setReceivedTrackStream(0);
    });

    socket.on("match:offer", async (offer) => {
      const pc = webRTCRef.current!;
      await pc.setRemoteDescription(offer);

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket!.emit("match:answer", {
        matchId: metadata.matchId,
        userId: userId,
        answer,
      });
    });

    const pendingCandidates: RTCIceCandidate[] = [];
    socket.on("match:candidate", async (candidate) => {
      if (!candidate) {
        return;
      }

      const pc = webRTCRef.current!;

      if (pc.remoteDescription) {
        return await webRTCRef.current!.addIceCandidate(candidate);
      }

      pendingCandidates.push(candidate);
    });

    socket.on("match:answer", (answer) => {
      webRTCRef.current!.setRemoteDescription(answer);
    });
  }

  function checkConnection() {
    const socket = getSocket();
    if (!socket) {
      return;
    }

    changeChat({
      isConnected: true,
    });
  }

  useEffect(() => {
    loadUserId();
    listenEvents();
    checkConnection();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        changeChat,
        metadata,
        localStream: localStreamRef,
        remoteStream: remoteStreamRef,
        receivedTrackStream,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export function useChat(): ChatContextProps {
  return useContext(ChatContext) as ChatContextProps;
}
