import { Cta } from "./_components/cta";
import { FAQ } from "./_components/faq";
import { Features } from "./_components/features";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { How } from "./_components/how";
import { SeoTerms } from "./_components/seo-terms";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <SeoTerms />
      <How />
      <Features />
      <FAQ />
      <Cta />
      <Footer />
    </main>
  );
}
