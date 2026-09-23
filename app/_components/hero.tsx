"use client";

import { ProductPreview } from "@/app/_components/product-preview";
import { TermTicker } from "@/app/_components/term-ticker";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/provider";
import Link from "next/link";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="pt-28 pb-16 lg:pt-32 lg:pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl space-y-6">
            <BrandLogo
              priority
              className="rounded-md bg-neutral-950 px-3 py-2"
              imageClassName="h-12 sm:h-14"
            />
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
              {t.hero.title}
            </h1>
            <TermTicker />
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Button asChild size="lg" className="h-11 px-6">
                <Link href="/chat">{t.hero.cta}</Link>
              </Button>
              <p className="text-xs text-muted-foreground">{t.hero.note}</p>
            </div>
          </div>
          <ProductPreview />
        </div>
      </div>
    </section>
  );
}
