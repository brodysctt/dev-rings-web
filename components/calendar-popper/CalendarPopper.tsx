import { useState } from "react";
import { useCollection, Log } from "@lib/firebase/firestore";
import { dayjs, formatLogs, getMonthYear } from "@lib/dayjs";
import type { MonthYear } from "@lib/dayjs";
import { PopIt } from "components";
import { DayTile } from "./DayTile";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarSvg from "@mui/icons-material/CalendarTodayRounded";
import BackSvg from "@mui/icons-material/ArrowBackRounded";
import NextSvg from "@mui/icons-material/ArrowForwardRounded";
import type { SxProps } from "@mui/system";

export const CalendarPopper = () => {
  const [monthInView, setMonthInView] = useState<MonthYear>(getMonthYear());
  const logs = useCollection("logs");
  if (!logs) return null;

  const logsInView = filterLogs(logs as Log[], monthInView);
  const formattedLogs = formatLogs(logsInView, monthInView);

  const [month, year] = monthInView;
  const gridStart = dayjs(`${year}-${month}-01`).day();
  const isFirst = isFirstMonth(logs as Log[], monthInView);

  const back = () => {
    if (month === 1) {
      setMonthInView([12, year - 1]);
      return;
    }
    setMonthInView([month - 1, year]);
  };
  const next = () => {
    if (month === 12) {
      setMonthInView([1, year + 1]);
      return;
    }
    setMonthInView([month + 1, year]);
  };

  return (
    <PopIt
      id="View calendar"
      closeOnClick
      paperSx={{ pt: 1 }}
      icon={<CalendarSvg />}
    >
      <Stack alignItems="center" p={2} pt={1} sx={containerSx}>
        <Typography color="primary" sx={{ fontSize: 12 }}>
          {year}
        </Typography>
        <>
          <Grid container justifyContent="center" sx={{ mb: 2 }}>
            <Button onClick={back} startIcon={<BackSvg />} disabled={isFirst} />
            <Grid item xs={8}>
              <Typography variant="h6" textAlign="center">
                {dayjs.months()[month - 1]}
              </Typography>
            </Grid>
            {/* TODO: Update disabled to monthInView !== currentMonth */}
            <Button onClick={next} startIcon={<NextSvg />} disabled={false} />
          </Grid>
          <Grid container columns={7} gap={"3px"}>
            {<Grid item xs={gridStart} sx={{ mr: "-3px" }} />}
            {formattedLogs.map((log, i) => (
              <DayTile key={i} log={log} />
            ))}
          </Grid>
        </>
      </Stack>
    </PopIt>
  );
};

const containerSx = {
  width: 480,
  border: "1px solid #DCDEE6",
  borderRadius: 10,
} as SxProps;

const filterLogs = (logs: Log[], monthInView: MonthYear) => {
  const [month, year] = monthInView;
  // TODO: Test this! Gotta be airtight
  const dateMatch = new RegExp(`${year}-${month < 10 ? "0" : ""}${month}-.*`);
  return logs.filter((log) => {
    const [dateString] = log;
    return dateMatch.test(dateString);
  });
};

const isFirstMonth = (logs: Log[], monthInView: MonthYear) => {
  const firstLogDate = dayjs.min(logs.map(([dateString]) => dayjs(dateString)));
  const firstMonth = getMonthYear(firstLogDate);
  return !(JSON.stringify(monthInView) === JSON.stringify(firstMonth));
};
