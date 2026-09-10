"use client";

import { ChatStatus, useChat } from "@/components/chat/chat.provider";
import { cn } from "@/lib/utils";
import { ChatInputMobile } from "./chat-input-mobile";
import { LocalVideoChat } from "./local-video-chat";
import { NextMatchButton } from "./next-match-button";
import { RemoteVideoChat } from "./remote-video-chat";
import TextChat from "./text-chat";

export function Chat() {
  const { metadata } = useChat();
  const isWaiting = metadata.status === ChatStatus.WAITING;

  return (
    <main
      className={cn(
        "relative flex min-h-dvh flex-col bg-background",
        "lg:grid lg:h-dvh lg:grid-cols-[minmax(0,1fr)_22rem] lg:overflow-hidden",
        "md:p-4 lg:gap-4",
      )}
    >
      <section className="flex min-h-0 flex-1 flex-col">
        <div
          className={cn(
            "grid min-h-0 flex-1 overflow-hidden",
            "grid-rows-2 md:grid-rows-1 md:grid-cols-2",
            "h-[100dvh] md:h-auto lg:h-full",
            "md:rounded-xl md:border",
            !isWaiting && "max-md:h-[calc(100dvh-4.5rem)]",
          )}
        >
          <div className="min-h-0 border-b border-white/10 md:border-b-0 md:border-r">
            <LocalVideoChat />
          </div>
          <div className="min-h-0">
            <RemoteVideoChat />
          </div>
        </div>

        {!isWaiting && (
          <div className="hidden w-full shrink-0 items-center justify-end py-2 md:flex">
            <NextMatchButton />
          </div>
        )}
      </section>

      <div className="hidden min-h-0 md:flex md:items-stretch">
        <TextChat />
      </div>

      {!isWaiting && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-2 md:hidden">
          <div className="flex w-full items-center gap-2">
            <ChatInputMobile />
            <NextMatchButton />
          </div>
        </div>
      )}
    </main>
  );
}
