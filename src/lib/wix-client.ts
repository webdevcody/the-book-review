import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";
import Cookies from "js-cookie";

export function getClient() {
  return createClient({
    modules: { items },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: JSON.parse(Cookies.get("session") || "null"),
    }),
  });
}

export function convertWixImageToUrl(wixImageUrl: string) {
  return `https://static.wixstatic.com/media/${wixImageUrl.split("/")[3]}`;
}
