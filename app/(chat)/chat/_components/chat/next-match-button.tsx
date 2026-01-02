"use client";

import { userGetIdAction } from "@/backend/user/actions/user-get-id.action";
import { useChat } from "@/components/chat/chat.provider";
import { Button } from "@/components/ui/button";
import { getSocket } from "@/lib/socket-client";
import { ArrowRightIcon } from "lucide-react";

export function NextMatchButton() {
  const { metadata } = useChat();

  async function handleNextMatch() {
    const userId = await userGetIdAction();
    const socket = getSocket();
    console.log("METADATA", {
      userId: userId,
      matchId: metadata.matchId,
    });
    socket!.emit("match:next", {
      userId: userId,
      matchId: metadata.matchId,
    });
  }
  return (
    <Button onClick={handleNextMatch} variant="outline">
      Próximo <ArrowRightIcon className="size-4" />
    </Button>
  );
}
