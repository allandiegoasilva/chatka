"use client";

import { useI18n } from "@/lib/i18n/provider";
import { Footer } from "./footer";
import { Header } from "./header";

export function Terms() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              {t.terms.title}
            </h1>
            <p className="text-sm text-muted-foreground">{t.terms.updated}</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t.terms.intro}
          </p>
          <div className="space-y-6">
            {t.terms.sections.map((section) => (
              <article key={section.title} className="space-y-2">
                <h2 className="text-lg font-medium">{section.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {section.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
