"use server";

import { getServerClient } from "@/lib/wix";
import { OauthData } from "@wix/sdk";
import { cookies } from "next/headers";

export async function loginCallbackAction(url: string) {
  const returnedOAuthData = getServerClient().auth.parseFromUrl(url);

  if (returnedOAuthData.error) {
    throw new Error(returnedOAuthData.errorDescription);
  }

  const oauthDataStr = cookies().get("oauthRedirectData")?.value;
  cookies().delete("oauthRedirectData");

  if (!oauthDataStr) {
    return new Response("No oauth data found", { status: 400 });
  }

  const oauthData = JSON.parse(oauthDataStr) as OauthData;

  const memberTokens = await getServerClient().auth.getMemberTokens(
    returnedOAuthData.code,
    returnedOAuthData.state,
    oauthData
  );

  const serializableTokens = {
    accessToken: memberTokens.accessToken,
    refreshToken: memberTokens.refreshToken,
  };

  cookies().set("session", JSON.stringify(serializableTokens));
}
