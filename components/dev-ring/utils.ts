import { dayjs } from "@lib/dayjs";
import type { Timestamp } from "firebase/firestore";

export interface RepoEvent {
  createdAt: Timestamp;
  eventType: string;
  repo: string;
  message: string;
  url: string;
}

// TODO: Test these functions a bunch – can't have any tz/date mishaps

export const getDayEvents = (events: RepoEvent[], dateString: string) => {
  const dateStringEvents = events.map((event) => [
    dayjs(event.createdAt.toDate()).format("YYYY-MM-DD"),
    event,
  ]);

  return dateStringEvents
    .filter((event) => event[0] === dateString)
    .map((event) => event[1]) as RepoEvent[];
};
