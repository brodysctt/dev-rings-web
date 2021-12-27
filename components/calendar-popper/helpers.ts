import { dayjs, MonthYear } from "@lib/dayjs";
import type { Log } from "@lib/firebase/firestore";
import type { Dispatch, SetStateAction } from "react";

export const filterLogs = (logs: Log[], monthInView: MonthYear) => {
  const [month, year] = monthInView;
  // TODO: Make sure this is airtight
  const dateMatch = new RegExp(`${month < 10 ? "0" : ""}${month}-.*-${year}`);
  return logs.filter((log) => {
    const [dateString] = log;
    return dateMatch.test(dateString);
  });
};

export const getFirstLogDate = (logs: Log[]) =>
  dayjs.min(logs.map(([dateString]) => dayjs(dateString)));

export const setMonth = (
  to: "previous" | "next",
  monthInView: MonthYear,
  setMonthInView: Dispatch<SetStateAction<MonthYear>>
) => {
  const [month, year] = monthInView;

  if (to === "previous") {
    if (month === 1) {
      setMonthInView([12, year - 1]);
      return;
    }
    setMonthInView([month - 1, year]);
  }

  if (month === 12) {
    setMonthInView([1, year + 1]);
    return;
  }
  setMonthInView([month + 1, year]);
};
