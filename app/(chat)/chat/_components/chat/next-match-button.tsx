"use client";

import { userGetIdAction } from "@/backend/user/actions/user-get-id.action";
import { ChatStatus, useChat } from "@/components/chat/chat.provider";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/provider";
import { getSocket } from "@/lib/socket-client";
import { ArrowRightIcon } from "lucide-react";
import { useEffect, useRef } from "react";

export function NextMatchButton() {
  const { t } = useI18n();
  const { metadata } = useChat();
  const matchIdRef = useRef(metadata.matchId);

  matchIdRef.current = metadata.matchId;

  async function handleNextMatch() {
    if (metadata.status !== ChatStatus.CONNECTED) {
      return;
    }

    const userId = await userGetIdAction();
    const socket = getSocket();

    socket?.emit("match:next", {
      userId: userId,
      matchId: matchIdRef.current,
    });
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape" || event.repeat) {
        return;
      }

      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [role='dialog']")) {
        return;
      }

      event.preventDefault();
      void handleNextMatch();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [metadata.status]);

  return (
    <Button
      onClick={handleNextMatch}
      variant="outline"
      size="icon"
      className="size-12 md:h-auto md:w-auto md:px-3 md:gap-1.5"
    >
      <ArrowRightIcon className="size-4" />
      <span className="hidden md:inline">{t.chat.next}</span>
      <kbd className="hidden md:inline rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
        Esc
      </kbd>
    </Button>
  );
}
