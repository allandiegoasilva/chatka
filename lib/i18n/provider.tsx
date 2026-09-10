"use client";

import { setLocaleAction } from "@/backend/session/set-locale";
import {
  defaultLocale,
  localeHtml,
  messages,
  type Locale,
  type Messages,
} from "@/lib/i18n/messages";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
};

const I18nContext = createContext<I18nContextValue>({
  locale: defaultLocale,
  setLocale: () => undefined,
  t: messages[defaultLocale],
});

type Props = {
  locale: Locale;
  children: ReactNode;
};

export function I18nProvider({ locale: initialLocale, children }: Props) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    document.documentElement.lang = localeHtml[locale];
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale: (next) => {
        setLocaleState(next);
        void setLocaleAction(next);
      },
      t: messages[locale],
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
