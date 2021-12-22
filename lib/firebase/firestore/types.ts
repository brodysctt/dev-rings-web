import type { Timestamp } from "firebase/firestore";

export interface RepoEvent {
  createdAt: Timestamp;
  eventType: string;
  repo: string;
  message: string;
  url: string;
}
