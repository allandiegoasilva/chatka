"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { useI18n } from "@/lib/i18n/provider";
import { lpImages } from "@/lib/lp-images";
import Image from "next/image";

const featureImages = [lpImages.video, lpImages.next, lpImages.anonymous];

export function Features() {
  const { t } = useI18n();

  return (
    <section className="relative border-t py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <BlurFade inView>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-12 max-w-md">
            {t.features.title}
          </h2>
        </BlurFade>
        <div className="grid gap-px rounded-xl border overflow-hidden md:grid-cols-3 bg-border">
          {t.features.items.map((item, index) => (
            <BlurFade key={item.title} delay={0.08 * index} inView>
              <article className="h-full bg-background">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={featureImages[index]}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 sm:p-8 space-y-3">
                  <h3 className="text-base font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </article>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
