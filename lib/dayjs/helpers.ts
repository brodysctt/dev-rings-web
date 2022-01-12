import type { Dayjs } from "dayjs";
import { dayjs } from "@lib/dayjs";

export const checkTimezone = (tz: string) =>
  dayjs().utcOffset() !== dayjs().tz(tz).utcOffset();

export const getMonthName = (monthInView: MonthYear) => {
  const [month] = monthInView;
  const months = dayjs.months();
  return months[month - 1];
};

export type MonthYear = [number, number];
export const getMonthYear = (date?: Dayjs): MonthYear => [
  // Note: dayjs(undefined) === dayjs()
  dayjs(date).month() + 1,
  dayjs(date).year(),
];
