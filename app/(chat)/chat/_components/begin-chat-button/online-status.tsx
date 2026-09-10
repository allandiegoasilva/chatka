"use client";

import { useChat } from "@/components/chat/chat.provider";
import { NumberTicker } from "@/components/ui/number-ticker";
import { useI18n } from "@/lib/i18n/provider";
import { getSocket } from "@/lib/socket-client";
import { useEffect, useState } from "react";

export function OnlineStatus() {
  const { t } = useI18n();
  const { metadata } = useChat();
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) {
      return;
    }

    function loadStats() {
      const current = getSocket();
      if (!current) {
        return;
      }

      current.emit("users:stats", (stats: { total: number }) => {
        setOnlineUsers(stats.total);
      });
    }

    loadStats();
    const interval = setInterval(loadStats, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [metadata.isConnected]);

  return (
    <p className="text-sm text-muted-foreground">
      <NumberTicker
        value={onlineUsers}
        className="text-foreground tracking-normal"
      />{" "}
      {t.connect.online}
    </p>
  );
}
