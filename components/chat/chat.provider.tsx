"use client";

import { MatchFoundDto } from "@/backend/match/match-found.dto";
import { userGetIdAction } from "@/backend/user/actions/user-get-id.action";
import { userSaveAction } from "@/backend/user/actions/user-save.action";
import { socketConnect } from "@/lib/socket-client";
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
};

export type ChatContextProps = {
  changeChat(metadata: Partial<ChatMetadata>): void;
  metadata: ChatMetadata;
  localStream: RefObject<MediaStream | null>;
  remoteStream: RefObject<MediaStream | null>;
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
  });

  async function loadUserId() {
    await userSaveAction();
    userId = await userGetIdAction();
    console.log("USER ID", userId);
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
        console.log("INICIANDO A OFFER");
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
        console.log("ON TRACK", event);
        remoteStreamRef.current = event.streams[0];
      };

      webRTCRef.current!.onicecandidate = (
        event: RTCPeerConnectionIceEvent,
      ) => {
        console.log("INICIANDO O ICE CANDIDATE");
        if (event && socket) {
          console.log("ON ICE CANDIDATE", event);
          socket.emit("match:candidate", {
            matchId: metadata.matchId,
            userId: userId,
            candidate: event.candidate,
          });
        }
      };
    }

    socket.on("match:found", (match: MatchFoundDto) => {
      changeChat({
        status: ChatStatus.CONNECTED,
        matchId: match.matchId,
      });

      webRTCRef.current = createWebrtcClient();

      localWebRTCClient(match.startOffer);
    });

    socket.on("match:ended", () => {
      socket?.emit("queue:join");
      changeChat({
        status: ChatStatus.WAITING,
      });
    });

    socket.on("match:candidate", (candidate) => {
      console.log("ON-CANDIDATE", candidate);
      webRTCRef.current!.addIceCandidate(candidate);
    });

    socket.on("match:answer", (answer) => {
      console.log("ON-ANSWER", answer);
      webRTCRef.current!.setRemoteDescription(answer);
    });

    socket.on("match:offer", async (offer) => {
      console.log("ON-OFFER", offer);
      const pc = webRTCRef.current!;
      await pc.setRemoteDescription(offer);

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      console.log("INICIANDO A ANSWER");
      socket!.emit("match:answer", {
        matchId: metadata.matchId,
        userId: userId,
        answer,
      });
    });
  }

  useEffect(() => {
    loadUserId();
    listenEvents();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        changeChat,
        metadata,
        localStream: localStreamRef,
        remoteStream: remoteStreamRef,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export function useChat(): ChatContextProps {
  return useContext(ChatContext) as ChatContextProps;
}
