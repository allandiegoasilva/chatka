"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { useI18n } from "@/lib/i18n/provider";
import { useState } from "react";

export function FAQ() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-t py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <BlurFade inView>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              {t.faq.title}
            </h2>
          </BlurFade>
          <div>
            {t.faq.items.map((faq, index) => {
              const open = openIndex === index;
              return (
                <BlurFade key={faq.question} delay={0.05 * index} inView>
                  <div className="border-b">
                    <button
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="w-full text-left py-5 flex items-start justify-between gap-6"
                      aria-expanded={open}
                    >
                      <span className="font-medium">{faq.question}</span>
                      <span className="text-muted-foreground text-sm mt-0.5">
                        {open ? "−" : "+"}
                      </span>
                    </button>
                    {open && (
                      <p className="pb-5 text-sm text-muted-foreground leading-relaxed max-w-xl">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
