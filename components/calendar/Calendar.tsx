import { useState } from "react";
import { db } from "@lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { Month } from "./Month";
import { DayLog } from "components";

export const Calendar = ({ userId }: { userId: string }) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [yearInView, setYearInView] = useState(currentYear);
  const [monthInView, setMonthInView] = useState(currentMonth);

  // TODO: Make decision on how I want to handle loading and error states
  // Feel like a custom hook that fires Sentry errors would be hype 🤷‍♂️
  const [logsSnapshot] = useCollection(collection(db, "users", userId, "logs"));

  if (logsSnapshot) {
    const { docs } = logsSnapshot;
    const logs = docs.map((doc: any) => [doc.id, doc.data()]) as DayLog[];
    const logsInView = filterLogs(logs, monthInView, yearInView);

    const [[firstLogDate]] = logs;
    const firstMonth = new Date(firstLogDate).getMonth() + 1;

    return (
      <Month
        logs={logsInView}
        hasPrevious={monthInView !== firstMonth}
        hasNext={true} //TODO: Update once I delete demo date --> monthInView !== currentMonth
        monthInView={monthInView}
        setMonthInView={setMonthInView}
      />
    );
  }
  return null;
};

const filterLogs = (logs: DayLog[], month: number, year: number) => {
  const dateMatch = new RegExp(`${month}.*${year}`);
  return logs.filter((log) => {
    const [dateString] = log;
    return dateMatch.test(dateString);
  });
};
