"use client";

import { ChatStatus, useChat } from "@/components/chat/chat.provider";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export function LocalVideoChat() {
  const { metadata, localStream } = useChat();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !localStream.current) return;

    // Atribui o stream ao vídeo
    video.srcObject = localStream.current;

    // Função para reproduzir o vídeo
    const playVideo = async () => {
      if (!video || video.srcObject !== localStream.current) return;

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
  }, []);

  return (
    <div className="relative w-full h-full rounded-xl rounded-r-none overflow-hidden bg-neutral-900">
      {metadata.status === ChatStatus.REQUIRE_PERMISSION && (
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
        className={cn("w-full h-full object-cover object-center ok ")}
        style={{
          transform: "scaleX(-1)", // Espelha o vídeo horizontalmente
        }}
      />
    </div>
  );
}
