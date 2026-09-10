"use client";

import { BorderBeam } from "@/components/ui/border-beam";
import { useI18n } from "@/lib/i18n/provider";
import { lpImages } from "@/lib/lp-images";
import Image from "next/image";

export function ProductPreview() {
  const { t } = useI18n();

  return (
    <div className="relative overflow-hidden rounded-xl border bg-neutral-950 text-white shadow-sm">
      <BorderBeam
        size={90}
        duration={10}
        borderWidth={1}
        colorFrom="oklch(0.586 0.253 17.585)"
        colorTo="oklch(0.645 0.246 16.439)"
      />
      <div className="grid grid-cols-2 min-h-[280px] sm:min-h-[360px]">
        <div className="relative border-r border-white/10">
          <Image
            src={lpImages.you}
            alt={t.preview.you}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 420px"
            priority
          />
          <span className="absolute left-3 top-3 rounded-md bg-black/55 px-2 py-1 text-[11px] text-white/90">
            {t.preview.you}
          </span>
        </div>
        <div className="relative">
          <Image
            src={lpImages.remote}
            alt={t.preview.searching}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 420px"
            priority
          />
          <span className="absolute right-3 top-3 rounded-md bg-black/55 px-2 py-1 text-[11px] text-white/90">
            {t.preview.searching}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-white/10 px-3 py-2.5">
        <p className="truncate text-xs text-white/60">{t.preview.message}</p>
        <span className="shrink-0 rounded-md border border-white/15 px-2 py-1 text-[11px] text-white/80">
          {t.preview.next}
        </span>
      </div>
    </div>
  );
}
