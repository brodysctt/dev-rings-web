import type { Timestamp } from "firebase/firestore";

export type CollectionName = "events" | "logs" | "webhooks";

export type Log = [
  string,
  {
    actual: number;
    goal: number;
  }
];

export interface RepoEvent {
  createdAt: Timestamp;
  eventType: string;
  repo: string;
  message: string;
  url: string;
}

export interface Webhook {
  createdAt: Timestamp;
  pingUrl: string;
  url: string;
}
