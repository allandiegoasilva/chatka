"use client";

import { useI18n } from "@/lib/i18n/provider";

export function ProductPreview() {
  const { t } = useI18n();

  return (
    <div className="overflow-hidden rounded-xl border bg-neutral-950 text-white">
      <div className="grid grid-cols-2 min-h-[240px] sm:min-h-[300px]">
        <div className="relative border-r border-white/10 bg-neutral-900">
          <span className="absolute left-3 top-3 rounded-md bg-black/55 px-2 py-1 text-[11px] text-white/90">
            {t.preview.you}
          </span>
        </div>
        <div className="relative flex items-center justify-center bg-neutral-950">
          <span className="absolute right-3 top-3 rounded-md bg-black/55 px-2 py-1 text-[11px] text-white/90">
            {t.preview.searching}
          </span>
          <p className="text-sm text-white/50">{t.waiting.title}</p>
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
