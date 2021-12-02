import { Log, MonthYear } from "components";

export const createMonthLogs = (
  logs: Log[],
  hasPrevious: boolean,
  monthInView: MonthYear
) => {
  const dayLogs: ZeroIndexDayLog[] = logs.map((log) => {
    const [dateString, rest] = log;
    return [new Date(dateString).getDate() - 1, rest];
  });
  const [[firstDay]] = dayLogs;

  let i = 0;
  let dayOffIndexes = [];
  for (const dayLog of dayLogs) {
    const dayCount = !hasPrevious ? i + firstDay : i;
    const [day] = dayLog;
    const daysOff: number = day - dayCount;
    if (daysOff > 0) {
      for (let i = 0; i < daysOff; i++) {
        dayOffIndexes.push(dayCount + i);
      }
      i = i + daysOff;
    }
    i++;
  }

  dayOffIndexes.forEach((dayOffIndex) => {
    dayLogs.splice(dayOffIndex, 0, [dayOffIndex, { actual: 0, goal: 0 }]);
  });

  const [month, year] = monthInView;
  const completeLogs: Log[] = dayLogs.map((dayLog) => {
    const [zeroIndexDay, rest] = dayLog;
    const day = zeroIndexDay + 1;
    const dayString = day < 10 ? `0${day}` : day.toString();
    const dateString = `/${month}-${dayString}-${year}`;
    return [dateString, rest];
  });
  return completeLogs;
};

type ZeroIndexDayLog = [
  number, // zero-indexed day of month
  {
    actual: number;
    goal: number;
  }
];
