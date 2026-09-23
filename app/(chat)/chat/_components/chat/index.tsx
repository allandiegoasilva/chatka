"use client";

import { ChatStatus, useChat } from "@/components/chat/chat.provider";
import { cn } from "@/lib/utils";
import { ChatInputMobile } from "./chat-input-mobile";
import { ChatNavbar } from "./chat-navbar";
import { ReactionBar } from "./reaction-bar";
import { LocalVideoChat } from "./local-video-chat";
import { MatchFilters } from "./match-filters";
import { NextMatchButton } from "./next-match-button";
import { RemoteVideoChat } from "./remote-video-chat";
import TextChat from "./text-chat";

export function Chat() {
  const { metadata } = useChat();
  const isWaiting = metadata.status === ChatStatus.WAITING;

  return (
    <main className="relative flex min-h-dvh flex-col bg-background lg:h-dvh lg:overflow-hidden">
      <ChatNavbar />
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col",
          "lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:overflow-hidden",
          "md:p-4 lg:gap-4",
        )}
      >
      <section className="flex min-h-0 flex-1 flex-col md:gap-4">
        <div
          className={cn(
            "relative min-h-0 flex-1 overflow-hidden",
            "h-[calc(100dvh-3.5rem)] md:grid md:h-auto md:grid-cols-2 md:gap-4 lg:h-full",
            !isWaiting && "max-md:h-[calc(100dvh-11rem)]",
          )}
        >
          <div className="max-md:contents min-h-0 overflow-hidden md:rounded-xl md:border">
            <LocalVideoChat />
          </div>
          <div className="max-md:absolute max-md:inset-0 min-h-0 overflow-hidden md:rounded-xl md:border">
            <RemoteVideoChat />
          </div>
        </div>

        <div className="hidden w-full shrink-0 items-stretch gap-4 md:flex">
          <div className="min-w-0 flex-1">
            <MatchFilters />
          </div>
          {metadata.status === ChatStatus.CONNECTED && <NextMatchButton />}
        </div>
      </section>

      <aside className="hidden min-h-0 md:flex md:items-stretch">
        <TextChat />
      </aside>
      </div>

      {!isWaiting && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
          <div className="mb-2 flex justify-center">
            <ReactionBar />
          </div>
          <div className="flex w-full items-center gap-2">
            <ChatInputMobile />
            <NextMatchButton />
          </div>
        </div>
      )}
    </main>
  );
}
