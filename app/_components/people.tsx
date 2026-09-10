"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { lpImages } from "@/lib/lp-images";
import Image from "next/image";

export function People() {
  return (
    <section className="relative border-t py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {lpImages.faces.map((src, index) => (
            <BlurFade key={src} delay={0.04 * index} inView>
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 16vw"
                />
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
