import { MonthYear } from "components";

export const createMonthYear = (date?: Date): MonthYear => {
  if (!date) {
    return [new Date().getMonth() + 1, new Date().getFullYear()];
  }
  return [date.getMonth() + 1, date.getFullYear()];
};
