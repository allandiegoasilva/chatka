"use server";

import { getClientId } from "@/backend/session/get-client-id";
import { setClientId } from "@/backend/session/set-client-id";
import { saveUser } from "@/server/store";

type UserSaveDto = Partial<{
  gender: string;
  countryCode: string | null;
  state: string | null;
  ip: string | null;
  matchType: string;
  filterCountry: string | null;
}>;

export async function userSaveAction(input?: UserSaveDto): Promise<string> {
  try {
    const clientId = await getClientId();
    const user = saveUser({
      userId: clientId,
      ...input,
    });
    await setClientId(user.id);
    return user.id;
  } catch {
    return "fail";
  }
}
