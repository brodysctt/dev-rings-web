import type { Timestamp } from "firebase/firestore";

export interface RepoEvent {
  createdAt: Timestamp;
  dateString: string;
  eventType: string;
  repo: string;
  message: string;
  url: string;
}

// TODO: Test these functions a bunch! Can't have any timezone/date mishaps

export const getDayEvents = (events: RepoEvent[], dateString: string) => {
  const dateStringEvents = events.map((event) => [
    createDateString(event.createdAt.toDate()),
    event,
  ]);

  return dateStringEvents
    .filter((event) => event[0] === dateString)
    .map((event) => event[1]) as RepoEvent[];
};

export const createDateString = (date?: string | Date) => {
  const newDate = date ? new Date(date) : new Date();
  return newDate.toLocaleDateString().replace(/\//g, "-");
};
