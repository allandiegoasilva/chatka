"use client";

import { seoTerms } from "@/lib/seo-terms";
import { useI18n } from "@/lib/i18n/provider";

export function SeoTerms() {
  const { t } = useI18n();
  const loop = [...seoTerms, ...seoTerms];

  return (
    <section className="border-t py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {t.seo.title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t.seo.body}
          </p>
        </div>
      </div>
      <div className="relative mt-10 overflow-hidden border-y bg-muted/40">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max animate-marquee gap-2 py-3">
          {loop.map((term, index) => (
            <span
              key={`${term}-${index}`}
              className="shrink-0 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground"
            >
              {term}
            </span>
          ))}
        </div>
        <div className="flex w-max animate-marquee-reverse gap-2 border-t py-3">
          {[...loop].reverse().map((term, index) => (
            <span
              key={`${term}-rev-${index}`}
              className="shrink-0 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground"
            >
              {term}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
