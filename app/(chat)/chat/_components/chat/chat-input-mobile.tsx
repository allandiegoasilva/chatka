"use client";

import { userGetIdAction } from "@/backend/user/actions/user-get-id.action";
import { useChat } from "@/components/chat/chat.provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clampMessage, MESSAGE_MAX_LENGTH } from "@/lib/chat-limits";
import { useI18n } from "@/lib/i18n/provider";
import { getSocket } from "@/lib/socket-client";
import { FormEvent, useEffect, useState } from "react";

export function ChatInputMobile() {
  const [input, setInput] = useState("");
  const { t } = useI18n();
  const { metadata } = useChat();

  async function sendMessage(content: string) {
    const socket = getSocket();
    if (!socket) return;

    const userId = await userGetIdAction();
    socket.emit("chat:send", {
      message: content,
      userId,
      matchId: metadata.matchId,
    });
  }

  async function sendTyping() {
    const socket = getSocket();
    if (!socket) return;

    const userId = await userGetIdAction();
    socket.emit("chat:typing", {
      userId,
      matchId: metadata.matchId,
      isTyping: true,
    });
  }

  async function handleSend(e: FormEvent) {
    e.preventDefault();

    const trimmedInput = clampMessage(input);
    if (!trimmedInput) return;

    await sendMessage(trimmedInput);

    window.dispatchEvent(
      new CustomEvent("chat:local-message", { detail: trimmedInput }),
    );

    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e as unknown as React.FormEvent);
    }
  }

  useEffect(() => {
    if (input.trim()) {
      sendTyping();
    }

    const debounceTimeout = setTimeout(async () => {
      const socket = getSocket();
      if (!socket || input.trim()) return;

      const userId = await userGetIdAction();
      socket.emit("chat:typing", {
        userId,
        matchId: metadata.matchId,
        isTyping: false,
      });
    }, 1000);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [input, metadata.matchId]);

  return (
    <form
      onSubmit={handleSend}
      className="flex flex-1 items-center gap-2"
      autoComplete="off"
    >
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value.slice(0, MESSAGE_MAX_LENGTH))}
        onKeyDown={handleKeyDown}
        placeholder={t.chat.placeholder}
        maxLength={MESSAGE_MAX_LENGTH}
        className="h-12 flex-1 text-base"
      />
      <Button
        type="submit"
        disabled={!input.trim()}
        className="h-12 px-4 text-base"
      >
        {t.chat.send}
      </Button>
    </form>
  );
}
