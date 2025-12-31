"use server";
import { cookies } from "next/headers";

export async function setClientId(clientId: string) {
  const cookiesStore = await cookies();
  cookiesStore.set("clientId", clientId);
}
