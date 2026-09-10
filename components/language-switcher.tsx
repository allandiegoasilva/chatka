"use client";

import { localeLabels, locales } from "@/lib/i18n/messages";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  className?: string;
  light?: boolean;
};

export function LanguageSwitcher({ className, light }: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n();

  return (
    <div className={cn("flex items-center gap-1 text-xs", className)}>
      {locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLocale(item)}
          className={cn(
            "px-1.5 py-0.5 rounded-sm",
            light
              ? locale === item
                ? "text-white"
                : "text-white/55 hover:text-white"
              : locale === item
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
          )}
        >
          {localeLabels[item]}
        </button>
      ))}
    </div>
  );
}
