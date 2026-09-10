"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { useI18n } from "@/lib/i18n/provider";
import { lpImages } from "@/lib/lp-images";
import Image from "next/image";

const stepImages = [lpImages.camera, lpImages.match, lpImages.talk];

export function How() {
  const { t } = useI18n();

  return (
    <section id="how" className="relative border-t py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <BlurFade inView>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-12">
            {t.how.title}
          </h2>
        </BlurFade>
        <ol className="grid gap-8 md:grid-cols-3 md:gap-8">
          {t.how.steps.map((step, index) => (
            <BlurFade key={step.title} delay={0.08 * index} inView>
              <li className="space-y-4">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                  <Image
                    src={stepImages[index]}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="text-xs tabular-nums text-muted-foreground">
                  0{index + 1}
                </p>
                <h3 className="text-lg font-medium">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </li>
            </BlurFade>
          ))}
        </ol>
      </div>
    </section>
  );
}
