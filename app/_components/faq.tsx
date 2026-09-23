"use client";

import { useI18n } from "@/lib/i18n/provider";
import { useState } from "react";

export function FAQ() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {t.faq.title}
          </h2>
          <div>
            {t.faq.items.map((faq, index) => {
              const open = openIndex === index;
              return (
                <div key={faq.question} className="border-b">
                  <button
                    type="button"
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
