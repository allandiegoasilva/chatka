"use client";

import { useI18n } from "@/lib/i18n/provider";

export function How() {
  const { t } = useI18n();

  return (
    <section id="how" className="border-t py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-10">
          {t.how.title}
        </h2>
        <ol className="grid gap-8 md:grid-cols-3">
          {t.how.steps.map((step, index) => (
            <li key={step.title} className="space-y-2">
              <p className="text-xs tabular-nums text-muted-foreground">
                0{index + 1}
              </p>
              <h3 className="text-lg font-medium">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
