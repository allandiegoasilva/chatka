"use client";

import { BrandLogo } from "@/components/brand-logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/provider";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useI18n();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="rounded-md bg-neutral-950 px-2 py-1">
            <BrandLogo priority imageClassName="h-7" />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#how"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {t.nav.how}
            </Link>
            <Link
              href="#faq"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {t.nav.faq}
            </Link>
            <LanguageSwitcher />
            <Button asChild size="sm">
              <Link href="/chat">{t.nav.chat}</Link>
            </Button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label={t.nav.menu}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link
              href="#how"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm text-muted-foreground"
            >
              {t.nav.how}
            </Link>
            <Link
              href="#faq"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm text-muted-foreground"
            >
              {t.nav.faq}
            </Link>
            <LanguageSwitcher />
            <Button asChild className="w-full">
              <Link href="/chat" onClick={() => setIsMenuOpen(false)}>
                {t.nav.chat}
              </Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
