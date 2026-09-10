"use client";

import { ChatStatus, useChat } from "@/components/chat/chat.provider";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { MessagesOverlay } from "./messages-overlay";
import { RemoteUserBadge } from "./remote-user-badge";
import { RemoteVideo } from "./remote-video";

export function RemoteVideoChat() {
  const { metadata, remoteStream, receivedTrackStream } = useChat();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isWaiting = metadata.status === ChatStatus.WAITING;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !remoteStream?.current) {
      return;
    }

    if (video.srcObject !== remoteStream.current) {
      video.srcObject = remoteStream.current;
    }

    const playVideo = async () => {
      if (!video || video.srcObject !== remoteStream.current) {
        return;
      }

      try {
        await video.play();
      } catch (error) {
        if (
          error instanceof Error &&
          error.name !== "AbortError" &&
          error.name !== "NotAllowedError"
        ) {
          console.error("Erro ao reproduzir vídeo remoto:", error);
        }
      }
    };

    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", playVideo);
    };
  }, [receivedTrackStream, remoteStream]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-950">
      {metadata.status === ChatStatus.CONNECTED && (
        <>
          <RemoteUserBadge
            username={metadata.userRemote.username}
            gender={metadata.userRemote.gender}
            countryCode={metadata.userRemote.countryCode}
            state={metadata.userRemote.state}
          />
          <MessagesOverlay />
        </>
      )}

      {isWaiting && <RemoteVideo />}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={cn(
          "h-full w-full object-cover object-center scale-x-[-1]",
          isWaiting && "hidden",
        )}
      />
    </div>
  );
}
