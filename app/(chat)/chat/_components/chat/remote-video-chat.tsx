"use client";

import { ChatStatus, useChat } from "@/components/chat/chat.provider";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { RemoteVideo } from "./remote-video";

export function RemoteVideoChat() {
  const { metadata, remoteStream, receivedTrackStream } = useChat();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !remoteStream?.current) return;

    // Atribui o stream ao vídeo apenas se for diferente
    if (video.srcObject !== remoteStream.current) {
      video.srcObject = remoteStream.current;
    }

    // Função para reproduzir o vídeo
    const playVideo = async () => {
      if (!video || video.srcObject !== remoteStream.current) return;

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
  }, [receivedTrackStream]);

  const isWaiting = metadata.status === ChatStatus.WAITING;

  return (
    <div className="relative w-full h-full rounded-xl rounded-l-none overflow-hidden bg-neutral-900">
      {metadata.status === ChatStatus.CONNECTED && (
        <div
          className={cn(
            "absolute top-4 left-4 z-20",
            "px-3 py-1.5 rounded-md",
            "bg-black/60 backdrop-blur-sm border border-white/10",
            "text-sm font-medium text-white",
          )}
        >
          CONECTADO
        </div>
      )}

      {isWaiting && <RemoteVideo />}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={cn(
          "w-full h-full object-cover object-center scale-x-[-1]",
          isWaiting && "hidden",
        )}
      />
    </div>
  );
}
