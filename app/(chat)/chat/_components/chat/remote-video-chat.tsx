"use client";

import { ChatStatus, useChat } from "@/components/chat/chat.provider";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { RemoteVideo } from "./remote-video";

export function RemoteVideoChat() {
  const { metadata } = useChat();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !metadata.remoteStream) return;

    // Atribui o stream ao vídeo
    video.srcObject = metadata.remoteStream;

    // Função para reproduzir o vídeo
    const playVideo = async () => {
      if (!video || video.srcObject !== metadata.remoteStream) return;

      try {
        await video.play();
      } catch (error) {
        // Ignora erros de play interrompido
        if (
          error instanceof Error &&
          error.name !== "AbortError" &&
          error.name !== "NotAllowedError"
        ) {
          console.error("Erro ao reproduzir vídeo remoto:", error);
        }
      }
    };

    // Tenta reproduzir imediatamente se o vídeo já está pronto
    if (video.readyState >= 3) {
      playVideo();
    } else {
      // Caso contrário, aguarda o evento canplay
      const handleCanPlay = () => {
        playVideo();
      };

      video.addEventListener("canplay", handleCanPlay, { once: true });

      return () => {
        video.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, [metadata.remoteStream]);

  const isWaiting = metadata.status === ChatStatus.WAITING;
  const hasRemoteStream = !!metadata.remoteStream;

  return (
    <div className="relative w-full h-full rounded-xl lg:rounded-l-none overflow-hidden bg-neutral-900">
      {isWaiting && <RemoteVideo />}

      {!hasRemoteStream && !isWaiting && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "bg-neutral-800 z-10",
            "text-muted-foreground",
          )}
        >
          <p className="text-sm">Aguardando vídeo remoto...</p>
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={cn(
          "w-full h-full object-cover object-center",
          !hasRemoteStream && "hidden",
        )}
      />
    </div>
  );
}
