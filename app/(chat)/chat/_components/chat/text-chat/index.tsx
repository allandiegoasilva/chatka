"use client";

import { userGetIdAction } from "@/backend/user/actions/user-get-id.action";
import { ChatStatus, useChat } from "@/components/chat/chat.provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n/provider";
import { getSocket } from "@/lib/socket-client";
import { cn } from "@/lib/utils";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

interface Message {
  sender: "localUser" | "remoteUser";
  content: string;
}

export default function TextChat() {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useI18n();
  const { metadata } = useChat();
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  async function sendMessage(message: Message) {
    const socket = getSocket();
    if (!socket) return;

    const userId = await userGetIdAction();
    socket.emit("chat:send", {
      message: message.content,
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

    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage: Message = {
      sender: "localUser",
      content: trimmedInput,
    };

    await sendMessage(userMessage);

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e as unknown as React.FormEvent);
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    function handleMessage(message: { message: string }) {
      setMessages((prev) => [
        ...prev,
        { content: message.message, sender: "remoteUser" },
      ]);
    }

    function handleTyping(data: { isTyping: boolean }) {
      setIsTyping(data.isTyping);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      if (data.isTyping) {
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    }

    socket.on("chat:message", handleMessage);
    socket.on("chat:typing", handleTyping);

    return () => {
      socket.off("chat:message", handleMessage);
      socket.off("chat:typing", handleTyping);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (metadata.status === ChatStatus.WAITING) {
      setMessages([]);
    }
  }, [metadata.status]);

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
    <Card
      className={cn(
        "flex h-full w-full flex-col",
        "max-h-[calc(100dvh-2rem)] lg:max-h-none",
      )}
    >
      <CardContent className="flex-1 p-0 overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 min-h-0">
          <div className="space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm">
                {t.chat.empty}
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={"message-" + index}
                className={`flex ${
                  message.sender === "localUser"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2.5 text-sm",
                    "max-w-[75%] sm:max-w-[70%]",
                    "shadow-sm",
                    "wrap-break-word",
                    "leading-relaxed",
                    message.sender === "localUser"
                      ? "bg-slate-700/90 text-white rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm border border-border/50",
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2.5 text-sm",
                    "max-w-[75%] sm:max-w-[70%]",
                    "shadow-sm",
                    "bg-muted text-foreground rounded-bl-sm border border-border/50",
                  )}
                >
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 lg:p-6">
        <form
          onSubmit={handleSend}
          className="flex w-full items-center gap-2"
          autoComplete="off"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={t.chat.placeholder}
            className="flex-1 text-sm sm:text-base"
          />
          <Button type="submit" disabled={!input.trim()}>
            {t.chat.send}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
