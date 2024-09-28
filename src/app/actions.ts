"use server";

import { getServerClient } from "@/lib/wix";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction() {
  const data = await getServerClient().auth.generateOAuthData(
    `${process.env.NEXT_PUBLIC_URL}/login-callback`,
    process.env.NEXT_PUBLIC_URL
  );
  cookies().set("oauthRedirectData", JSON.stringify(data));
  const { authUrl } = await getServerClient().auth.getAuthUrl(data);
  revalidatePath("/");
  redirect(authUrl);
}

export async function logoutAction() {
  const client = getServerClient();
  const { logoutUrl } = await client.auth.logout(process.env.NEXT_PUBLIC_URL!);
  cookies().delete("session");
  revalidatePath("/");
  redirect(logoutUrl);
}
