import type { Log } from "components";
import { dayjs } from "@lib/dayjs/dayjs";

export type MonthYear = [number, number];

export const createMonthYear = (date?: Date): MonthYear => [
  // dayjs(undefined) === dayjs()
  dayjs(date).month() + 1,
  dayjs(date).year(),
];

export const createMonthLogs = (
  logs: Log[],
  hasPrevious: boolean,
  monthInView: MonthYear
) => {
  const dayLogs: ZeroIndexDayLog[] = logs.map((log) => {
    const [dateString, rest] = log;
    return [dayjs(dateString).date() - 1, rest];
  });
  const [[firstDay]] = dayLogs;
  const [[lastDay]] = dayLogs.slice(-1);

  let i = 0;
  let dayOffIndices: number[] = [];
  for (const dayLog of dayLogs) {
    const dayCount = !hasPrevious ? i + firstDay : i;
    const daysOff: number = dayLog[0] - dayCount;
    if (daysOff > 0) {
      [...Array(daysOff)].forEach((d, k) => dayOffIndices.push(dayCount + k));
      i = i + daysOff;
    }
    i++;
  }

  const [month, year] = monthInView;
  const lastDayOfMonth = dayjs(new Date(year, month, 0)).date() - 1; // zero-indexed
  const daysOff = lastDayOfMonth - lastDay;
  if (daysOff > 0) {
    [...Array(daysOff)].forEach((d, i) => dayOffIndices.push(lastDay + 1 + i));
  }

  dayOffIndices.forEach((dayOffIndex) => {
    dayLogs.splice(dayOffIndex, 0, [dayOffIndex, { actual: 0, goal: 0 }]);
  });

  const monthLogs: Log[] = dayLogs.map((dayLog) => {
    const [zeroIndexDay, rest] = dayLog;
    const day = zeroIndexDay + 1;
    // TODO: Use dayjs here to format this automatically
    const dateString = `${month}-${day < 10 ? 0 : ""}${day}-${year}`;
    return [dateString, rest];
  });
  return monthLogs;
};

type ZeroIndexDayLog = [
  number, // zero-indexed day of month
  {
    actual: number;
    goal: number;
  }
];
