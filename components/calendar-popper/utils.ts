import type { Log } from "components";
import { dayjs, MonthYear } from "@lib/dayjs";

export const filterLogs = (logs: Log[], monthInView: MonthYear) => {
  const [month, year] = monthInView;
  // TODO: Make sure this is airtight
  const dateMatch = new RegExp(`${month < 10 ? "0" : ""}${month}-.*-${year}`);
  return logs.filter((log) => {
    const [dateString] = log;
    return dateMatch.test(dateString);
  });
};

export const getFirstLogDate = (logs: Log[]) =>
  dayjs.min(logs.map(([dateString]) => dayjs(dateString)));
