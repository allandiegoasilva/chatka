import { ChatProvider } from "@/components/chat/chat.provider";
import { BeginChatButton } from "./_components/begin-chat-button";

export default function ChatPage() {
  return (
    <ChatProvider>
      <BeginChatButton />;
    </ChatProvider>
  );
}
