"use client";

import { userGetIdAction } from "@/backend/user/actions/user-get-id.action";
import { useChat } from "@/components/chat/chat.provider";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/provider";
import { getSocket } from "@/lib/socket-client";
import { ArrowRightIcon } from "lucide-react";

export function NextMatchButton() {
  const { t } = useI18n();
  const { metadata } = useChat();

  async function handleNextMatch() {
    const userId = await userGetIdAction();
    const socket = getSocket();

    socket!.emit("match:next", {
      userId: userId,
      matchId: metadata.matchId,
    });
  }
  return (
    <Button
      onClick={handleNextMatch}
      variant="outline"
      size="icon"
      className="w-10 md:px-4 md:py-2 md:gap-2 md:w-auto"
    >
      <ArrowRightIcon className="size-4" />
      <span className="hidden md:inline">{t.chat.next}</span>
    </Button>
  );
}
