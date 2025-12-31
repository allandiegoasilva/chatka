"use client";
import { userSaveAction } from "@/backend/user/actions/user-save.action";
import { io } from "socket.io-client";

export async function socketConnect() {
  const clientId = await userSaveAction();

  const socket = io("http://localhost:3001", {
    query: {
      clientId: clientId,
    },
  });

  socket.on("disconnect", () => {
    console.log("disconnected from socket");
  });
}
