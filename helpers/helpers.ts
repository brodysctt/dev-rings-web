import { dayjs } from "@lib/dayjs";
import type { Webhook } from "@lib/firebase/firestore";

export const calcProgress = (actual: number, goal: number) =>
  actual >= goal ? 100 : (actual / goal) * 100;

export const checkTz = (tz: string) =>
  dayjs().utcOffset() !== dayjs().tz(tz).utcOffset();

export const getRepos = (webhooks: Webhook[], userId: string) =>
  // @ts-ignore
  webhooks.map((webhook) => {
    const re = new RegExp(`(?<=${userId}/).*(?=/hooks)`);
    const match = webhook.url.match(re);
    if (match) return match[0];
  }) as string[];
