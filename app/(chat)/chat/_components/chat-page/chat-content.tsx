"use client";

import {
  ChatStatus,
  useChat,
} from "@/components/chat/chat.provider";
import { BeginChatButton } from "../begin-chat-button";
import { Chat } from "../chat";

type Props = {
  showError: boolean;
};

export function ChatContent({ showError }: Props) {
  const { metadata } = useChat();

  if (metadata.status === ChatStatus.REQUIRE_PERMISSION) {
    return <BeginChatButton showError={showError} />;
  }

  return <Chat />;
}


