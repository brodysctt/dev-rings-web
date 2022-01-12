import type { Webhook } from "@lib/firebase/firestore";

export const getRepos = (webhooks: Webhook[], userId: string) =>
  // @ts-ignore
  webhooks.map((webhook) => {
    const re = new RegExp(`(?<=${userId}/).*(?=/hooks)`);
    const match = webhook.url.match(re);
    if (match) return match[0];
  }) as string[];
