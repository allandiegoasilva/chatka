"use server";

import { cookies } from "next/headers";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/messages";

export async function getLocale(): Promise<Locale> {
  const cookiesStore = await cookies();
  const value = cookiesStore.get("locale")?.value;
  return isLocale(value) ? value : defaultLocale;
}
