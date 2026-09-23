"use client";

import { useChat } from "@/components/chat/chat.provider";
import { spawnReaction, type ReactionType } from "@/lib/reactions";
import { getSocket } from "@/lib/socket-client";
import { cn } from "@/lib/utils";
import { Flame, Heart, Laugh, PartyPopper, ThumbsUp } from "lucide-react";

const items: { type: ReactionType; icon: typeof Heart; className: string }[] = [
  { type: "heart", icon: Heart, className: "text-rose-400" },
  { type: "laugh", icon: Laugh, className: "text-amber-400" },
  { type: "fire", icon: Flame, className: "text-orange-400" },
  { type: "like", icon: ThumbsUp, className: "text-sky-400" },
  { type: "party", icon: PartyPopper, className: "text-violet-400" },
];

export function ReactionBar() {
  const { metadata } = useChat();

  function send(type: ReactionType) {
    spawnReaction(type);
    getSocket()?.emit("chat:react", {
      matchId: metadata.matchId,
      userId: metadata.userId,
      reaction: type,
    });
  }

  return (
    <div className="flex items-center gap-1">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.type}
            type="button"
            onClick={() => send(item.type)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className={cn("size-4", item.className)} />
          </button>
        );
      })}
    </div>
  );
}
