"use client";

import { socketConnect } from "@/lib/socket-client";
import { createContext, useContext, useEffect, useState } from "react";

export enum ChatOrigin {
  LOCAL = "LOCAL",
  REMOTE = "REMOTE",
}

export enum ChatStatus {
  REQUIRE_PERMISSION = "REQUIRE_PERMISSION",
  WAITING = "WAITING",
  CONNECTED = "CONNECTED",
}

export type ChatMetadata = {
  status: ChatStatus;
  origin: ChatOrigin;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
};

export type ChatContextProps = {
  changeChat(metadata: Partial<ChatMetadata>): void;
  metadata: ChatMetadata;
};

const ChatContext = createContext({});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [metadata, setMetadata] = useState<ChatMetadata>({
    status: ChatStatus.REQUIRE_PERMISSION,
    origin: ChatOrigin.LOCAL,
    localStream: null,
    remoteStream: null,
  });

  function changeChat(input: Partial<ChatMetadata>) {
    setMetadata({
      ...metadata,
      ...input,
    });
  }

  useEffect(() => {
    socketConnect();
  }, []);

  return (
    <ChatContext.Provider value={{ changeChat, metadata }}>
      {children}
    </ChatContext.Provider>
  );
};

export function useChat(): ChatContextProps {
  return useContext(ChatContext) as ChatContextProps;
}
