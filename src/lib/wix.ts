import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";

const client = createClient({
  modules: { items },
  auth: OAuthStrategy({
    clientId: process.env.WIX_CLIENT_ID!,
  }),
});

export function convertWixImageToUrl(wixImageUrl: string) {
  return `https://static.wixstatic.com/media/${wixImageUrl.split("/")[3]}`;
}

export default client;
