import type { Log } from "components";
import type { MonthYear } from "@lib/dayjs";

export const filterLogs = (logs: Log[], monthInView: MonthYear) => {
  const [month, year] = monthInView;
  // TODO: Make sure this is airtight
  // TODO: Refactor with dayjs
  const dateMatch = new RegExp(`${month < 10 ? "0" : ""}${month}-.*-${year}`);
  return logs.filter((log) => {
    const [dateString] = log;
    return dateMatch.test(dateString);
  });
};
