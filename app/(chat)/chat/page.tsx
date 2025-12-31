import { ChatPage } from "./_components/chat-page";

type Params = {
  searchParams: Promise<{ disconnected: string }>;
};

export default async function Page({ searchParams }: Params) {
  const { disconnected } = await searchParams;

  return <ChatPage showError={disconnected === "1"} />;
}
