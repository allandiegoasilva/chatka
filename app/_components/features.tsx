"use client";

import { useI18n } from "@/lib/i18n/provider";

export function Features() {
  const { t } = useI18n();

  return (
    <section className="border-t py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-10 max-w-md">
          {t.features.title}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {t.features.items.map((item) => (
            <article key={item.title} className="space-y-2">
              <h3 className="text-base font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
