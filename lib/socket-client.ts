"use client";
import { userGetIdAction } from "@/backend/user/actions/user-get-id.action";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export async function socketConnect() {
  if (socket?.connected) {
    return socket;
  }

  const clientId = await userGetIdAction();

  if (clientId === "fail") {
    return null;
  }

  socket = io(`${process.env.NEXT_PUBLIC_API_URL}/socket`, {
    query: {
      clientId: clientId,
    },
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
