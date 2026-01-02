"use client";

import { useChat } from "@/components/chat/chat.provider";
import { getSocket } from "@/lib/socket-client";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";

export function OnlineStatus() {
  const { metadata } = useChat();
  const [onlineUsers, setOnlineUsers] = useState(0);

  function loadStats() {
    const socket = getSocket();
    if (!socket) {
      return;
    }

    socket.emit("users:stats", (stats: { total: number }) => {
      setOnlineUsers(stats.total);
    });
  }

  function loadStatsWithInterval() {
    loadStats();
    setInterval(() => {
      loadStats();
    }, 3000);
  }

  useEffect(() => {
    loadStatsWithInterval();
  }, [metadata.isConnected]);

  return (
    <div className="w-full flex items-center justify-center gap-4 p-4 rounded-xl bg-muted/30 border">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md animate-pulse" />
          <div className="relative flex items-center gap-2">
            <div className="size-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              Online agora
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Users className="size-4 text-primary" />
        <span className="font-semibold text-foreground">
          {onlineUsers.toLocaleString("pt-BR")}
        </span>
        <span className="text-muted-foreground">usuários</span>
      </div>
    </div>
  );
}
