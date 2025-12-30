"use client";

import { createContext } from "react";

export enum ChatOrigin {
  LOCAL = "LOCAL",
  REMOTE = "REMOTE",
}

export enum ChatStatus {
  WAITING = "WAITING",
  CONNECTED = "CONNECTED",
  DISCONNECTED = "DISCONNECTED",
}

export type ChatContextProps = {
  changeStatus: (status: ChatStatus) => void;
  changeOrigin: (origin: ChatOrigin) => void;
  status: ChatStatus;
  origin: ChatOrigin;
};

const ChatContext = createContext({});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  return <ChatContext.Provider value={{}}>{children}</ChatContext.Provider>;
};
