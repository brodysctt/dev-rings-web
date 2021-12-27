import { useState } from "react";
import { useCollection, Log } from "@lib/firebase/firestore";
import {
  dayjs,
  createMonthYear,
  createMonthLogs,
  getMonthName,
  MonthYear,
} from "@lib/dayjs";
import { Grid, Box, Typography, Button } from "@mui/material";
import type { SxProps } from "@mui/system";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { PopperWrapper, DayTile } from "components";
import { filterLogs, getFirstLogDate, setMonth } from "./helpers";

export const CalendarPopper = () => {
  const [monthInView, setMonthInView] = useState<MonthYear>(createMonthYear());

  const logs = useCollection("logs");
  if (!logs) return null;

  const logsInView = filterLogs(logs as Log[], monthInView);

  // TODO: Test this a bunch
  const firstMonth = createMonthYear(getFirstLogDate(logs as Log[]));
  const previousMonthExists = !(
    JSON.stringify(monthInView) === JSON.stringify(firstMonth)
  );

  const monthLogs = createMonthLogs(
    logsInView,
    previousMonthExists,
    monthInView
  );

  const [firstDate] = monthLogs[0];
  const gridStart = dayjs(firstDate).day();

  return (
    <PopperWrapper
      id="calendar"
      buttonVariant="text"
      icon={<CalendarTodayRoundedIcon />}
    >
      <Box sx={containerSx}>
        <Typography sx={{ fontSize: 12, color: "primary.main" }}>
          {monthInView[1]}
        </Typography>
        <>
          <Grid container justifyContent="center" sx={{ mb: 2 }}>
            <Button
              variant="text"
              onClick={() => setMonth("previous", monthInView, setMonthInView)}
              disabled={!previousMonthExists}
              startIcon={<ArrowBackRoundedIcon />}
            />
            <Grid item xs={8}>
              <Typography variant="h6" textAlign="center">
                {getMonthName(monthInView)}
              </Typography>
            </Grid>
            <Button
              variant="text"
              onClick={() => setMonth("next", monthInView, setMonthInView)}
              disabled={false} //TODO: Update once I delete demo date --> monthInView !== currentMonth
              endIcon={<ArrowForwardRoundedIcon />}
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
