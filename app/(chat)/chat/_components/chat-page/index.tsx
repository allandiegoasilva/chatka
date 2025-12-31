"use client";

import {
  ChatProvider,
  ChatStatus,
  useChat,
} from "@/components/chat/chat.provider";
import { BeginChatButton } from "../begin-chat-button";
import { Chat } from "../chat";

function ChatContent() {
  const { metadata } = useChat();

  if (metadata.status === ChatStatus.REQUIRE_PERMISSION) {
    return <BeginChatButton />;
  }

  return <Chat />;
}

export function ChatPage() {
  return (
    <ChatProvider>
      <ChatContent />
    </ChatProvider>
  );
}
