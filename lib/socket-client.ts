"use client";
import { userSaveAction } from "@/backend/user/actions/user-save.action";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export async function socketConnect() {
  if (socket?.connected) {
    return socket;
  }

  const clientId = await userSaveAction();

  socket = io("http://localhost:3001", {
    query: {
      clientId: clientId,
    },
  });

  socket.on("connect", () => {
    console.log("connected to socket", clientId);
  });

  socket.on("disconnect", () => {
    const url = new URL(window.location.href);
    url.searchParams.set("disconnected", "1");
    window.location.replace(url.toString());
  });

  return socket;
}

export function getSocket(): Socket | null {
  return socket;
}
