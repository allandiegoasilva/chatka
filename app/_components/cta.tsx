"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { useI18n } from "@/lib/i18n/provider";
import { lpImages } from "@/lib/lp-images";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Cta() {
  const { t } = useI18n();
  const router = useRouter();

  return (
    <section className="relative border-t py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <BlurFade inView>
          <div className="relative overflow-hidden rounded-xl min-h-[280px] flex items-end">
            <Image
              src={lpImages.cta}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
            <div className="relative z-10 w-full p-6 sm:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white max-w-md">
                {t.cta.title}
              </h2>
              <ShimmerButton
                type="button"
                className="h-11 px-6 w-fit"
                background="oklch(0.586 0.253 17.585)"
                borderRadius="8px"
                onClick={() => router.push("/chat")}
              >
                {t.cta.button}
              </ShimmerButton>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
