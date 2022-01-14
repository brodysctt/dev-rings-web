import { useState } from "react";
import { useCollection, Log } from "@lib/firebase/firestore";
import { dayjs, formatLogs, getMonthYear } from "@lib/dayjs";
import type { MonthYear } from "@lib/dayjs";
import { Grid, Box, Typography } from "@mui/material";
import type { SxProps } from "@mui/system";
import { ArrowButton, DayTile, PopIt, CalendarSvg } from "components";
import { filterLogs, isFirstMonth } from "./helpers";

export const CalendarPopper = () => {
  const [monthInView, setMonthInView] = useState<MonthYear>(getMonthYear());
  const logs = useCollection("logs");
  if (!logs) return null;

  const logsInView = filterLogs(logs as Log[], monthInView);
  const formattedLogs = formatLogs(logsInView, monthInView);

  const [month, year] = monthInView;
  const gridStart = dayjs(`${year}-${month}-01`).day();
  return (
    <PopIt id="View calendar" paperSx={{ pt: 1 }} icon={<CalendarSvg />}>
      <Box sx={containerSx}>
        <Typography sx={{ fontSize: 12, color: "primary.main" }}>
          {year}
        </Typography>
        <>
          <Grid container justifyContent="center" sx={{ mb: 2 }}>
            <ArrowButton
              {...{ type: "previous", monthInView, setMonthInView }}
              disabled={isFirstMonth(logs as Log[], monthInView)}
            />
            <Grid item xs={8}>
              <Typography variant="h6" textAlign="center">
                {dayjs.months()[month - 1]}
              </Typography>
            </Grid>
            <ArrowButton
              {...{ monthInView, setMonthInView, disabled: false }} // TODO: Update once I delete demo date --> monthInView !== currentMonth
            />
          </Grid>
          <Grid container columns={7} gap={"3px"}>
            {<Grid item xs={gridStart} sx={{ mr: "-3px" }} />}
            {formattedLogs.map((log, i) => (
              <DayTile key={i} log={log} />
            ))}
          </Grid>
        </>
      </Box>
    </PopIt>
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
