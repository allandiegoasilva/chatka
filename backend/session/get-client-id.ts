"use server";

import { cookies } from "next/headers";

export async function getClientId() {
  const cookiesStore = await cookies();
  return cookiesStore.get("clientId")?.value;
}
