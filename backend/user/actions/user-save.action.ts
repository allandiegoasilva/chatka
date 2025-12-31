"use server";

import { getClientId } from "@/backend/session/get-client-id";
import { setClientId } from "@/backend/session/set-client-id";
import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { UserDto } from "../dtos/user.dto";

export async function userSaveAction(): Promise<string> {
  try {
    const clientId = await getClientId();

    const response = await fetch(`${process.env.API_URL}/users/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: clientId,
      }),
    });

    const result: ReplyDto<UserDto> = await response.json();
    await setClientId(result.data.id);
    return result.data.id;
  } catch {
    return "fail";
  }
}
