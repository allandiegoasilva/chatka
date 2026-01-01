"use server";

import { cookies } from "next/headers";

export async function userGetIdAction(): Promise<string | undefined> {
  const cookiesStore = await cookies();
  return cookiesStore.get("clientId")?.value;
}
