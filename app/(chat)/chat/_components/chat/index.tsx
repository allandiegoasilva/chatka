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
        "min-h-screen",
        "flex flex-col lg:grid lg:grid-cols-[1fr_auto]",
        "p-0 md:p-4 sm:p-6 lg:p-10",
        "gap-4 lg:gap-5",
      )}
    >
      {/* Vídeo Layout */}
      <div className="relative w-full h-screen md:h-auto md:grid md:grid-cols-2 md:grid-rows-[1fr_auto] gap-2 lg:gap-0">
        {/* Vídeo local - oculto no mobile (fica flutuante) */}
        <div className="hidden md:flex col-span-1 flex-1 w-full h-full border border-r rounded-l-xl overflow-hidden">
          <LocalVideoChat />
        </div>
        {/* Vídeo local flutuante no mobile */}
        <div className="block md:hidden">
          <LocalVideoChat />
        </div>
        
        {/* Vídeo remoto - ocupa 100% no mobile */}
        <div className="fixed inset-0 md:static md:col-span-1 flex flex-1 w-full h-full border-0 md:border md:border-l rounded-none md:rounded-r-xl overflow-hidden">
          <RemoteVideoChat />
        </div>

        {/* NextButton - Desktop */}
        <div
          className={cn(
            "hidden md:flex col-span-2",
            "min-h-16 flex w-full",
            "flex items-center justify-end",
            "mt-2 lg:mt-0",
          )}
        >
          <NextMatchButton />
        </div>
      </div>

      {/* TextChat - Desktop */}
      <div className="hidden md:block w-full lg:w-auto flex items-start justify-center lg:justify-start">
        <TextChat />
      </div>

      {/* Input Chat + Next Button no mobile */}
      {!isWaiting && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-2">
          <div className="flex items-center gap-2 w-full">
            <ChatInputMobile />
            <NextMatchButton />
          </div>
        </div>
      )}
    </main>
  );
}
