import { dayjs, getMonthYear, MonthYear } from "@lib/dayjs";
import type { Log } from "@lib/firebase/firestore";

export const filterLogs = (logs: Log[], monthInView: MonthYear) => {
  const [month, year] = monthInView;
  // TODO: Test this! Gotta be airtight
  const dateMatch = new RegExp(`${month < 10 ? "0" : ""}${month}-.*-${year}`);
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
