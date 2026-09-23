"use client";

import { useChat } from "@/components/chat/chat.provider";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/provider";
import { isStreamLive, requestUserMedia } from "@/lib/media";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function RemoteVideo() {
  const { t } = useI18n();
  const { localStream, localStreamVersion, setLocalMedia } = useChat();
  const [isRequesting, setIsRequesting] = useState(false);
  const [failed, setFailed] = useState(false);
  const hasCamera = isStreamLive(localStream.current) || localStreamVersion > 0;

  async function requestPermissionsAgain() {
    setIsRequesting(true);
    setFailed(false);

    try {
      const stream = await requestUserMedia({ force: true });
      setLocalMedia(stream);
    } catch {
      setFailed(true);
    } finally {
      setIsRequesting(false);
    }
  }

  return (
    <div
      className={cn(
        "absolute inset-0 z-10 flex flex-col items-center justify-center gap-5",
        "bg-neutral-950 px-6 text-center",
      )}
    >
      <span
        className={cn(
          "absolute right-3 top-3 rounded-md bg-black/55 px-2 py-1",
          "text-[11px] text-white/90",
        )}
      >
        {t.preview.searching}
      </span>
      <Loader2 className="size-10 animate-spin text-white/80" />
      <div className="space-y-1">
        <p className="text-sm text-white">{t.waiting.title}</p>
        <p className="text-xs text-white/55">{t.waiting.hint}</p>
      </div>
      {failed && (
        <p className="max-w-xs text-xs text-white/55">{t.waiting.blocked}</p>
      )}
      {(!hasCamera || failed) && (
        <Button
          type="button"
          variant="outline"
          disabled={isRequesting}
          onClick={requestPermissionsAgain}
        >
          {isRequesting ? t.connect.requesting : t.connect.requestAgain}
        </Button>
      )}
    </div>
  );
}
