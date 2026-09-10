"use client";
import { userGetIdAction } from "@/backend/user/actions/user-get-id.action";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
let connecting: Promise<Socket | null> | null = null;

function getSocketUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  return apiUrl ? `${apiUrl}/socket` : "/socket";
}

function waitConnect(client: Socket, timeoutMs = 8000) {
  if (client.connected) {
    return Promise.resolve(client);
  }

  return new Promise<Socket | null>((resolve) => {
    const timer = setTimeout(() => {
      client.off("connect", onConnect);
      resolve(client.connected ? client : null);
    }, timeoutMs);

    function onConnect() {
      clearTimeout(timer);
      resolve(client);
    }

    client.once("connect", onConnect);
  });
}

export async function socketConnect() {
  if (socket?.connected) {
    return socket;
  }

  if (connecting) {
    return connecting;
  }

  connecting = (async () => {
    if (socket) {
      return waitConnect(socket);
    }

    const clientId = await userGetIdAction();

    if (!clientId || clientId === "fail") {
      return null;
    }

    socket = io(getSocketUrl(), {
      query: {
        clientId: clientId,
      },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 500,
    });

    return waitConnect(socket);
  })();

  try {
    return await connecting;
  } finally {
    connecting = null;
  }
}

export function getSocket(): Socket | null {
  return socket;
}
