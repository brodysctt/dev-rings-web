import type { RepoEvent } from "@lib/firebase/firestore";
import { dayjs } from "@lib/dayjs";

export const getDayEvents = (
  events: RepoEvent[] | null,
  dateString: string
) => {
  if (!events) return null;
  const dateStringEvents = events.map((event) => [
    dayjs(event.createdAt.toDate()).format("YYYY-MM-DD"),
    event,
  ]);

  const dayEvents = dateStringEvents
    .filter((event) => event[0] === dateString)
    .map((event) => event[1]) as RepoEvent[];

  if (!dayEvents.length) return null;
  return dayEvents;
};
