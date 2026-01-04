"use client";

import { ChatStatus, useChat } from "@/components/chat/chat.provider";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function LocalVideoChat() {
  const { metadata, localStream } = useChat();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 16 });
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const positionRef = useRef(position);
  const hasMovedRef = useRef(false);
  const initializedRef = useRef(false);
  
  // Atualiza a ref quando position muda
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  // Inicializa posição na direita no mobile
  useEffect(() => {
    if (typeof window === "undefined" || initializedRef.current) return;
    if (window.innerWidth >= 768) return; // Apenas no mobile

    // Usa o tamanho conhecido do container (120px base no mobile)
    const containerWidth = 120;
    const initialX = window.innerWidth - containerWidth - 16;
    
    setPosition({ x: initialX, y: 16 });
    positionRef.current = { x: initialX, y: 16 };
    initializedRef.current = true;
  }, []);

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

  // Funcionalidade de drag apenas no mobile
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startPos = { x: 0, y: 0 };
    let startTouchPos = { x: 0, y: 0 };
    let isDraggingActive = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.innerWidth >= 768) return; // Apenas no mobile
      
      const touch = e.touches[0];
      startTouchPos = { x: touch.clientX, y: touch.clientY };
      startPos = {
        x: touch.clientX - positionRef.current.x,
        y: touch.clientY - positionRef.current.y,
      };
      isDraggingActive = true;
      hasMovedRef.current = false;
      setIsDragging(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingActive || window.innerWidth >= 768) return;
      
      const touch = e.touches[0];
      const moved = Math.abs(touch.clientX - startTouchPos.x) > 5 ||
                    Math.abs(touch.clientY - startTouchPos.y) > 5;
      
      if (moved) {
        hasMovedRef.current = true;
      }
      
      const maxX = window.innerWidth - (container.offsetWidth || 120);
      const maxY = window.innerHeight - (container.offsetHeight || 160);
      
      const newX = Math.max(0, Math.min(touch.clientX - startPos.x, maxX));
      const newY = Math.max(0, Math.min(touch.clientY - startPos.y, maxY));
      
      positionRef.current = { x: newX, y: newY };
      setPosition({ x: newX, y: newY });
      e.preventDefault();
    };

    const handleTouchEnd = () => {
      isDraggingActive = false;
      setIsDragging(false);
      
      // Se não moveu, considera como clique e amplia
      if (!hasMovedRef.current && window.innerWidth < 768) {
        setIsExpanded((prev) => !prev);
      }
      
      hasMovedRef.current = false;
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);
    
    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full rounded-xl overflow-hidden bg-neutral-900",
        "md:rounded-r-none",
        "md:relative",
        "fixed md:static",
        "z-50 md:z-auto",
        "touch-none select-none",
        "cursor-pointer md:cursor-default",
        "w-[120px] h-[160px] md:w-full md:h-full",
        isExpanded && "w-[140px] h-[186px]",
        !isDragging && "transition-all",
      )}
      style={{
        ...(typeof window !== "undefined" && window.innerWidth < 768
          ? {
              left: `${position.x}px`,
              top: `${position.y}px`,
            }
          : {}),
      }}
    >
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
