import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { db } from "@lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { Month } from "./Month";
import { DayLog } from "components";

export type MonthYear = [number, number];

export const Calendar = ({ userId }: { userId: string }) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [monthInView, setMonthInView] = useState<MonthYear>([
    currentMonth,
    currentYear,
  ]);

  // TODO: Make decision on how I want to handle loading and error states
  // Feel like a custom hook that fires Sentry errors would be hype 🤷‍♂️
  const [logsSnapshot] = useCollection(collection(db, "users", userId, "logs"));

  if (logsSnapshot) {
    const { docs } = logsSnapshot;
    const logs = docs.map((doc: any) => [doc.id, doc.data()]) as DayLog[];
    const logsInView = filterLogs(logs, monthInView);
    console.log("here be the logs in view:");
    console.dir(logsInView);

    const firstLogDate = getFirstLogDate(logs);
    const firstMonth = [
      new Date(firstLogDate).getMonth() + 1,
      new Date(firstLogDate).getFullYear(),
    ] as MonthYear;
    const previousMonthExists = !(
      JSON.stringify(monthInView) === JSON.stringify(firstMonth)
    );

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 480,
          border: "2px solid #DCDEE6", //#CAD2F7 #DCDEE6
          borderRadius: 10,
          p: 2,
          pt: 1,
        }}
      >
        <Typography sx={{ fontSize: 12, color: "primary.main" }}>
          {monthInView[1]}
        </Typography>
        <Month
          logs={logsInView}
          hasPrevious={previousMonthExists}
          hasNext={true} //TODO: Update once I delete demo date --> monthInView !== currentMonth
          monthInView={monthInView}
          setMonthInView={setMonthInView}
        />
      </Box>
    );
  }
  return null;
};

const getFirstLogDate = (logs: DayLog[]) => {
  const sortedLogs = logs
    .map((log: DayLog) => {
      const [dateString] = log;
      return Date.parse(dateString);
    })
    .sort();
  return new Date(sortedLogs[0]);
};

const filterLogs = (logs: DayLog[], monthInView: MonthYear) => {
  const [month, year] = monthInView;
  // TODO: Make sure this is airtight
  const dateMatch = new RegExp(`${month < 10 ? "0" : ""}${month}-.*-${year}`);
  return logs.filter((log) => {
    const [dateString] = log;
    return dateMatch.test(dateString);
  });
};
