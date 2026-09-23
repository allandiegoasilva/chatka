"use client";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/provider";
import Link from "next/link";

export function Cta() {
  const { t } = useI18n();

  return (
    <section className="border-t py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight max-w-md">
          {t.cta.title}
        </h2>
        <Button asChild size="lg" className="h-11 px-6 w-fit">
          <Link href="/chat">{t.cta.button}</Link>
        </Button>
      </div>
    </section>
  );
}
