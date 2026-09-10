"use client";

import { ChatStatus, useChat } from "@/components/chat/chat.provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export function LocalVideoChat() {
  const { t } = useI18n();
  const { metadata, localStream, localStreamVersion } = useChat();
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-950">
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
        className="h-full w-full object-cover object-center"
        style={{ transform: "scaleX(-1)" }}
      />
      <span
        className={cn(
          "absolute left-3 top-3 z-20 rounded-md bg-black/55 px-2 py-1",
          "text-[11px] text-white/90",
        )}
      >
        {t.preview.you}
      </span>
      <div className="absolute right-3 top-3 z-20 rounded-md bg-black/55 px-1.5 py-0.5">
        <LanguageSwitcher light />
      </div>
    </div>
  );
}
