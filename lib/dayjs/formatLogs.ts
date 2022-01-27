import type { Log, LogData } from "@lib/firebase/firestore";
import { dayjs, MonthYear } from "@lib/dayjs";

type ZeroIndexDayLog = [
  number, // zero-indexed day of month
  LogData
];

export const formatLogs = (logs: Log[], monthInView: MonthYear): Log[] => {
  const dayLogs: ZeroIndexDayLog[] = logs.map(([dateString, rest]) => [
    dayjs(dateString).date() - 1,
    rest,
  ]);
  const [[lastDay]] = dayLogs.slice(-1);

  let i = 0;
  let dayOffIndices: number[] = [];
  for (const dayLog of dayLogs) {
    const daysOff: number = dayLog[0] - i;
    if (daysOff > 0) {
      [...Array(daysOff)].forEach((d, k) => dayOffIndices.push(i + k));
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
    dayLogs.splice(dayOffIndex, 0, [dayOffIndex, {}]);
  });

  return dayLogs.map(
    ([zeroIndexDay, rest]): Log => [
      dayjs([year, month - 1, zeroIndexDay + 1]).format("YYYY-MM-DD"),
      rest,
    ]
  );
};
