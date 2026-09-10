import { Cta } from "./_components/cta";
import { FAQ } from "./_components/faq";
import { Features } from "./_components/features";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { How } from "./_components/how";
import { People } from "./_components/people";
import { DotPattern } from "@/components/ui/dot-pattern";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <DotPattern
        glow={false}
        className="text-foreground/12 [mask-image:radial-gradient(ellipse_at_top,white,transparent_70%)]"
      />
      <div className="relative">
        <Header />
        <Hero />
        <People />
        <How />
        <Features />
        <FAQ />
        <Cta />
        <Footer />
      </div>
    </main>
  );
}
