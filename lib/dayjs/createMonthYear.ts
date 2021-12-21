import { dayjs } from "@lib/dayjs";
import type { Dayjs } from "dayjs";

export type MonthYear = [number, number];
export const createMonthYear = (date?: Dayjs): MonthYear => [
  // dayjs(undefined) === dayjs()
  dayjs(date).month() + 1,
  dayjs(date).year(),
];
