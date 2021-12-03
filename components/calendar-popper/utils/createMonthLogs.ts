import { Log, MonthYear } from "components";

export const createMonthLogs = (
  logs: Log[],
  hasPrevious: boolean,
  monthInView: MonthYear
) => {
  const [month, year] = monthInView;

  const dayLogs: ZeroIndexDayLog[] = logs.map((log) => {
    const [dateString, rest] = log;
    return [new Date(dateString).getDate() - 1, rest];
  });
  const [[firstLoggedDay]] = dayLogs;
  const [[lastLoggedDay]] = dayLogs.slice(-1);

  let i = 0;
  let dayOffIndexes = [];
  for (const dayLog of dayLogs) {
    const dayCount = !hasPrevious ? i + firstLoggedDay : i;
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

  const lastDayOfMonth = new Date(year, month, 0).getDate() - 1; // zero-indexed
  const endOfMonthDaysOff = lastDayOfMonth - lastLoggedDay;

  if (endOfMonthDaysOff > 0) {
    for (let i = 0; i < endOfMonthDaysOff; i++) {
      dayOffIndexes.push(lastDayOfMonth + i);
    }
    i++;
  }

  dayOffIndexes.forEach((dayOffIndex) => {
    dayLogs.splice(dayOffIndex, 0, [dayOffIndex, { actual: 0, goal: 0 }]);
  });

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
