"use client";

import { ChatStatus, useChat } from "@/components/chat/chat.provider";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const PIP_WIDTH = 132;
const PIP_HEIGHT = 176;
const PIP_MARGIN = 12;

function clampPosition(x: number, y: number) {
  const maxX = Math.max(PIP_MARGIN, window.innerWidth - PIP_WIDTH - PIP_MARGIN);
  const maxY = Math.max(PIP_MARGIN, window.innerHeight - PIP_HEIGHT - PIP_MARGIN);

  return {
    x: Math.min(Math.max(x, PIP_MARGIN), maxX),
    y: Math.min(Math.max(y, PIP_MARGIN), maxY),
  };
}

export function LocalVideoChat() {
  const { t } = useI18n();
  const { metadata, localStream, localStreamVersion } = useChat();
  const videoRef = useRef<HTMLVideoElement>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: PIP_MARGIN, y: PIP_MARGIN });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const place = () => {
      setPosition((current) =>
        clampPosition(
          window.innerWidth - PIP_WIDTH - 16,
          current.y === PIP_MARGIN ? 16 : current.y,
        ),
      );
    };

    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !localStream.current) {
      return;
    }

    video.srcObject = localStream.current;

    const playVideo = async () => {
      if (!video || video.srcObject !== localStream.current) {
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
          console.error("Erro ao reproduzir vídeo local:", error);
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
  }, [localStream, localStreamVersion]);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (window.innerWidth >= 768) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    dragOffsetRef.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
    setIsDragging(true);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging || window.innerWidth >= 768) {
      return;
    }

    setPosition(
      clampPosition(
        event.clientX - dragOffsetRef.current.x,
        event.clientY - dragOffsetRef.current.y,
      ),
    );
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={cn(
        "overflow-hidden bg-neutral-950",
        "max-md:fixed max-md:z-50 max-md:rounded-xl max-md:border max-md:border-white/15",
        "max-md:w-[132px] max-md:h-[176px] max-md:touch-none",
        "md:relative md:h-full md:w-full",
        isDragging ? "max-md:cursor-grabbing" : "max-md:cursor-grab",
      )}
      style={
        typeof window !== "undefined" && window.innerWidth < 768
          ? { left: position.x, top: position.y }
          : undefined
      }
    >
      {metadata.status === ChatStatus.REQUIRE_PERMISSION && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-900 text-muted-foreground">
          <p className="text-sm">{t.waiting.camera}</p>
        </div>
      )}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="h-full w-full object-cover object-center pointer-events-none"
        style={{ transform: "scaleX(-1)" }}
      />
      <span
        className={cn(
          "absolute left-2 top-2 z-20 rounded-md bg-black/55 px-2 py-1",
          "text-[11px] text-white/90 pointer-events-none",
        )}
      >
        {t.preview.you}
      </span>
    </div>
  );
}
