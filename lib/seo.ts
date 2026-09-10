import { Metadata } from "next";

const title = "Chatka ‣ Videochat Aleatório com Pessoas do Mundo Todo";
const description =
  "Conecte-se com pessoas aleatórias do mundo inteiro através de videochat e chat de texto! Chatka é uma plataforma de chat aleatório onde você pode conversar com estranhos via vídeo e mensagens. Faça novos amigos, pratique idiomas e conheça pessoas de diferentes culturas. Entre agora e comece sua próxima conversa!";

export const metadataSEO: Metadata = {
  title: {
    template: "%s | Chatka",
    default: title,
  },
  description: description,
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  keywords: [
    "Videochat aleatório",
    "Chat aleatório",
    "Omegle",
    "Chat com estranhos",
    "Videochat grátis",
    "Chat de vídeo",
    "Conversar com estranhos",
    "Videochat online",
    "Chat aleatório de vídeo",
    "Plataforma de videochat",
  ],
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    locale: "pt_BR",
    siteName: "Chatka",
    type: "website",
    title: title,
    description: description,
    url: process.env.SITE_URL || "http://localhost:3000",
  },
  twitter: {
    title: title,
    description: description,
    card: "summary_large_image",
  },
};
