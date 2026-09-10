"use client";

import { BrandLogo } from "@/components/brand-logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/lib/i18n/provider";
import Link from "next/link";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative border-t">
      <div className="container mx-auto px-4 sm:px-6 py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
        <div className="space-y-2">
          <Link href="/" className="inline-flex rounded-md bg-neutral-950 px-2 py-1">
            <BrandLogo imageClassName="h-8" />
          </Link>
          <p>{t.hero.note}</p>
        </div>
        <div className="flex items-center gap-5">
          <Link href="#how" className="hover:text-foreground">
            {t.nav.how}
          </Link>
          <Link href="#faq" className="hover:text-foreground">
            {t.nav.faq}
          </Link>
          <Link href="/chat" className="hover:text-foreground">
            {t.nav.chat}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
