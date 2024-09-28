import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";
import { cookies } from "next/headers";
import { members, authorization } from "@wix/members";

export function getServerClient() {
  return createClient({
    modules: { items, members, authorization },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: JSON.parse(cookies().get("session")?.value || "null"),
    }),
  });
}

export async function getMember() {
  const client = getServerClient();

  if (!client.auth.loggedIn()) {
    return undefined;
  }

  const { member } = await client.members.getCurrentMember();

  return member
    ? {
        id: member._id,
        loginEmail: member.loginEmail,
        nickname: member.profile?.nickname,
        slug: member.profile?.slug,
      }
    : undefined;
}
