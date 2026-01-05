import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Features } from "./_components/features";
import { FAQ } from "./_components/faq";
import { Footer } from "./_components/footer";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <FAQ />
      <Footer />
    </main>
  );
}