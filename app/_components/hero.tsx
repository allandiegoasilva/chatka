"use client";

import { ProductPreview } from "@/app/_components/product-preview";
import { BrandLogo } from "@/components/brand-logo";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { useI18n } from "@/lib/i18n/provider";
import { useRouter } from "next/navigation";

export function Hero() {
  const { t } = useI18n();
  const router = useRouter();

  return (
    <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-xl space-y-7">
            <BlurFade delay={0.04} inView>
              <BrandLogo
                priority
                className="rounded-md bg-neutral-950 px-3 py-2"
                imageClassName="h-12 sm:h-14"
              />
            </BlurFade>
            <BlurFade delay={0.08} inView>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
                {t.hero.title}
              </h1>
            </BlurFade>
            <BlurFade delay={0.14} inView>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.hero.subtitle}
              </p>
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <ShimmerButton
                  type="button"
                  className="h-11 px-6"
                  background="oklch(0.586 0.253 17.585)"
                  borderRadius="8px"
                  onClick={() => router.push("/chat")}
                >
                  {t.hero.cta}
                </ShimmerButton>
                <p className="text-xs text-muted-foreground">{t.hero.note}</p>
              </div>
            </BlurFade>
          </div>
          <BlurFade delay={0.16} inView>
            <ProductPreview />
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
