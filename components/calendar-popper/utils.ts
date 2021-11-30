import { MonthYear, DayLog } from "components";

export const filterLogs = (logs: DayLog[], monthInView: MonthYear) => {
  const [month, year] = monthInView;
  // TODO: Make sure this is airtight
  const dateMatch = new RegExp(`${month < 10 ? "0" : ""}${month}-.*-${year}`);
  return logs.filter((log) => {
    const [dateString] = log;
    return dateMatch.test(dateString);
  });
};

export const getFirstLogDate = (logs: DayLog[]) => {
  const sortedLogs = logs
    .map((log: DayLog) => {
      const [dateString] = log;
      return Date.parse(dateString);
    })
    .sort();
  return new Date(sortedLogs[0]);
};

export const createMonthYear = (date?: Date): MonthYear => {
  if (!date) {
    return [new Date().getMonth() + 1, new Date().getFullYear()];
  }
  return [date.getMonth() + 1, date.getFullYear()];
};
