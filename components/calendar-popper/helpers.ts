import { dayjs, getMonthYear, MonthYear } from "@lib/dayjs";
import type { Log } from "@lib/firebase/firestore";
import type { RepoEvent } from "@lib/firebase/firestore";

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

export const filterLogs = (logs: Log[], monthInView: MonthYear) => {
  const [month, year] = monthInView;
  // TODO: Test this! Gotta be airtight
  const dateMatch = new RegExp(`${year}-${month < 10 ? "0" : ""}${month}-.*`);
  return logs.filter((log) => {
    const [dateString] = log;
    return dateMatch.test(dateString);
  });
};

export const hasPreviousMonth = (monthInView: MonthYear, logs: Log[]) => {
  const firstLogDate = dayjs.min(logs.map(([dateString]) => dayjs(dateString)));
  const firstMonth = getMonthYear(firstLogDate);
  return !(JSON.stringify(monthInView) === JSON.stringify(firstMonth));
};
