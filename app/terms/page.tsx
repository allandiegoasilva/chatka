import { Terms } from "@/app/_components/terms";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de uso",
  description:
    "Chatka é um chat naturista só para maiores de 18 anos. Leia os termos de uso antes de entrar.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return <Terms />;
}
