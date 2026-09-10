"use server";

import { cookies } from "next/headers";
import { isLocale } from "@/lib/i18n/messages";

export async function setLocaleAction(locale: string) {
  if (!isLocale(locale)) {
    return;
  }

  const cookiesStore = await cookies();
  cookiesStore.set("locale", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
