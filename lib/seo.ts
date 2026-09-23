import { Metadata } from "next";
import { seoTerms } from "./seo-terms";

const siteUrl = process.env.SITE_URL || "http://localhost:3000";

const title =
  "Chatka — Chat anônimo sem login | Random video chat | Omegle alternative";
const description =
  "Anonymous chat without login. Chatka é um videochat aleatório tipo Omegle, Omeagle, Chatroulette e OmeTV: conversa com estranhos por vídeo e texto, sem cadastro, sem e-mail e sem perfil. Random video chat, talk to strangers, chat anónimo sin registro.";

export const metadataSEO: Metadata = {
  title: {
    template: "%s | Chatka",
    default: title,
  },
  description,
  applicationName: "Chatka",
  category: "Communication",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  keywords: [
    ...seoTerms,
    "Chatka",
    "video chat",
    "chat with strangers",
    "no signup chat",
    "free omegle",
    "omegle brasil",
    "omegle alternative 2026",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
      en: "/",
      es: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_ES"],
    siteName: "Chatka",
    type: "website",
    title,
    description,
    url: siteUrl,
    images: [
      {
        url: "/logo.png",
        alt: "Chatka — anonymous chat without login",
      },
    ],
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};
