"use client";

import { ChatStatus, useChat } from "@/components/chat/chat.provider";
import { getSocket } from "@/lib/socket-client";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

interface Message {
  sender: "localUser" | "remoteUser";
  content: string;
}

export function MessagesOverlay() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { metadata } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const visibilityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startVisibilityTimer = useCallback(() => {
    setIsVisible(true);

    if (visibilityTimeoutRef.current) {
      clearTimeout(visibilityTimeoutRef.current);
    }

    visibilityTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (messages.length > 0 || isTyping) {
      startVisibilityTimer();
    }

    return () => {
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current);
      }
    };
  }, [messages.length, isTyping, startVisibilityTimer]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    function handleMessage(message: { message: string }) {
      setMessages((prev) => [
        ...prev,
        { content: message.message, sender: "remoteUser" },
      ]);
      setIsVisible(true);
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current);
      }
      visibilityTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    }

    function handleLocalMessage(e: CustomEvent<string>) {
      setMessages((prev) => [
        ...prev,
        { content: e.detail, sender: "localUser" },
      ]);
      setIsVisible(true);
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current);
      }
      visibilityTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 4000);
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
    window.addEventListener(
      "chat:local-message",
      handleLocalMessage as EventListener,
    );

    return () => {
      socket.off("chat:message", handleMessage);
      socket.off("chat:typing", handleTyping);
      window.removeEventListener(
        "chat:local-message",
        handleLocalMessage as EventListener,
      );
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (metadata.status === ChatStatus.WAITING) {
      setMessages([]);
      setIsVisible(true);
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current);
      }
    }
  }, [metadata.status]);

  useEffect(() => {
    const handleClick = () => {
      if (messages.length > 0 || isTyping) {
        startVisibilityTimer();
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [messages.length, isTyping, startVisibilityTimer]);

  if (messages.length === 0 && !isTyping) return null;
  if (metadata.status === ChatStatus.WAITING) return null;

  return (
    <div
      className={cn(
        "absolute bottom-20 left-0 right-0 z-30 pr-4 pl-4 h-20 overflow-y-auto md:hidden",
        "transition-opacity duration-500 ease-in-out",
        isVisible ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="flex flex-col gap-1 max-w-md ml-auto pb-2 justify-end">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "text-sm",
              "max-w-[85%] sm:max-w-[75%]",
              "whitespace-pre-wrap",
              "leading-relaxed",
              message.sender === "localUser"
                ? "text-white ml-auto text-right"
                : "text-white text-left",
            )}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {message.content}
            </p>
          </div>
        ))}
        {isTyping && (
          <div className="text-white text-left max-w-[85%] sm:max-w-[75%]">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.3s] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
              <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.15s] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
              <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
