import type { Log } from "components";
import { dayjs, MonthYear } from "@lib/dayjs";

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
  // TODO: Triple check that month is right here
  const lastDayOfMonth = dayjs([year, month, 0]).date() - 1; // zero-indexed
  const daysOff = lastDayOfMonth - lastDay;
  if (daysOff > 0) {
    [...Array(daysOff)].forEach((d, i) => dayOffIndices.push(lastDay + 1 + i));
  }

  dayOffIndices.forEach((dayOffIndex) => {
    dayLogs.splice(dayOffIndex, 0, [dayOffIndex, { actual: 0, goal: 0 }]);
  });

  return dayLogs.map(([zeroIndexDay, rest]) => [
    dayjs([year, month - 1, zeroIndexDay + 1]).format("MM-DD-YYYY"),
    rest,
  ]) as Log[];
};

type ZeroIndexDayLog = [
  number, // zero-indexed day of month
  {
    actual: number;
    goal: number;
  }
];
