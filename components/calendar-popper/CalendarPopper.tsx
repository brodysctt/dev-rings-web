import { useState } from "react";
import { useCollection, Log } from "@lib/firebase/firestore";
import { dayjs, createMonthLogs, getMonthName, getMonthYear } from "@lib/dayjs";
import type { MonthYear } from "@lib/dayjs";
import { Grid, Box, Typography } from "@mui/material";
import type { SxProps } from "@mui/system";
import { ArrowButton, DayTile, PopperWrapper, CalendarIcon } from "components";
import { filterLogs, hasPreviousMonth } from "./helpers";

export const CalendarPopper = () => {
  const [monthInView, setMonthInView] = useState<MonthYear>(getMonthYear());

  const logs = useCollection("logs");
  if (!logs) return null;

  // TODO: Test all of these values a bunch
  const logsInView = filterLogs(logs as Log[], monthInView);
  const hasPrevious = hasPreviousMonth(monthInView, logs as Log[]);
  const monthLogs = createMonthLogs(logsInView, hasPrevious, monthInView);
  const gridStart = dayjs(monthLogs[0][0]).day();

  return (
    <PopperWrapper id="calendar" buttonVariant="text" icon={<CalendarIcon />}>
      <Box sx={containerSx}>
        <Typography sx={{ fontSize: 12, color: "primary.main" }}>
          {monthInView[1]}
        </Typography>
        <>
          <Grid container justifyContent="center" sx={{ mb: 2 }}>
            <ArrowButton
              {...{ type: "previous", monthInView, setMonthInView }}
              disabled={!hasPrevious}
            />
            <Grid item xs={8}>
              <Typography variant="h6" textAlign="center">
                {getMonthName(monthInView)}
              </Typography>
            </Grid>
            <ArrowButton
              {...{ monthInView, setMonthInView, disabled: false }} // TODO: Update once I delete demo date --> monthInView !== currentMonth
            />
          </Grid>
          <Grid container columns={7} gap={"3px"}>
            {<Grid item xs={gridStart} sx={{ mr: "-3px" }} />}
            {monthLogs.map((log, i) => (
              // Previously had setAnchorEl prop
              <DayTile key={i} log={log} />
            ))}
          </Grid>
        </>
      </Box>
    </PopperWrapper>
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
} as SxProps;
