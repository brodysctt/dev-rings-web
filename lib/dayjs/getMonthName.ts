import { dayjs, MonthYear } from "@lib/dayjs";

export const getMonthName = (monthInView: MonthYear) => {
  const [month] = monthInView;
  const months = dayjs.months();
  return months[month - 1];
};
