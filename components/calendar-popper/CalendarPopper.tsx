import { useState } from "react";
import { Box, Typography, Button, Popper, Fade, Paper } from "@mui/material";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import { db } from "@lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { Month } from "./Month";
import { filterLogs, getFirstLogDate, createMonthYear } from "./utils";

export type MonthYear = [number, number];
export type DayLog = [
  string,
  {
    actual: number;
    goal: number;
  }
];

export const CalendarPopper = ({ userId }: { userId: string }) => {
  const [monthInView, setMonthInView] = useState<MonthYear>(createMonthYear());

  // TODO: Make decision on how I want to handle loading and error states – custom hook w/ Sentry? 👀
  const [logsSnapshot] = useCollection(collection(db, "users", userId, "logs"));
  if (!logsSnapshot) {
    return null;
  }
  const logs = logsSnapshot.docs.map((doc: any) => [
    doc.id,
    doc.data(),
  ]) as DayLog[];
  const logsInView = filterLogs(logs, monthInView);

  const firstLogDate = getFirstLogDate(logs);
  const firstMonth = createMonthYear(firstLogDate);
  const previousMonthExists = !(
    JSON.stringify(monthInView) === JSON.stringify(firstMonth)
  );

  return (
    <PopupState variant="popper" popupId="calendar-popper">
      {(popupState) => (
        <>
          <Button
            variant="text"
            {...bindToggle(popupState)}
            sx={{ height: 60, ml: 1 }}
          >
            <CalendarTodayRoundedIcon />
          </Button>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper elevation={0} sx={{ p: 2 }}>
                  <Box sx={containerSx}>
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
                </Paper>
              </Fade>
            )}
          </Popper>
        </>
      )}
    </PopupState>
  );
};

const containerSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 480,
  border: "2px solid #DCDEE6",
  borderRadius: 10,
  p: 2,
  pt: 1,
} as any;
