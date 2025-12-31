"use client";

import { useChat } from "@/components/chat/chat.provider";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export function LocalVideoChat() {
  const { metadata } = useChat();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !metadata.localStream) return;

    // Atribui o stream ao vídeo
    video.srcObject = metadata.localStream;

    // Função para reproduzir o vídeo
    const playVideo = async () => {
      if (!video || video.srcObject !== metadata.localStream) return;

      try {
        await video.play();
      } catch (error) {
        // Ignora erros de play interrompido
        if (
          error instanceof Error &&
          error.name !== "AbortError" &&
          error.name !== "NotAllowedError"
        ) {
          console.error("Erro ao reproduzir vídeo local:", error);
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
  }, [metadata.localStream]);

  return (
    <div className="relative w-full h-full rounded-xl lg:rounded-r-none overflow-hidden bg-neutral-900">
      {!metadata.localStream && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "bg-neutral-800 z-10",
            "text-muted-foreground",
          )}
        >
          <p className="text-sm">Aguardando acesso à câmera...</p>
        </div>
      )}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={cn("w-full h-full object-cover object-center")}
        style={{
          transform: "scaleX(-1)", // Espelha o vídeo horizontalmente
        }}
      />
    </div>
  );
}
