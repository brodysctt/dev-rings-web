import type { Timestamp } from "firebase/firestore";

export type CollectionName = "events" | "logs" | "webhooks";

// TODO: Create a generic for this tuple pattern that can be used for Webhook as well
export type Log = [
  string,
  {
    commits?: {
      actual: number;
      goal: number;
    };
    prs?: {
      actual: number;
      goal: number;
    };
  }
];

export interface RepoEvent {
  createdAt: Timestamp;
  eventType: string;
  repo: string;
  message: string;
  url: string;
}

export type Webhook = [string, string];
