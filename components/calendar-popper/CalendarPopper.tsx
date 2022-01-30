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
import { styled } from "@mui/material/styles";

const Container = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: 480,
  },
}));

export const CalendarPopper = () => {
  const [monthInView, setMonthInView] = useState<MonthYear>(getMonthYear());
  const logs = useCollection("logs");
  if (!logs) return null;

  const logsInView = filterLogs(logs as Log[], monthInView);
  const formattedLogs = formatLogs(logsInView, monthInView);

  const [month, year] = monthInView;
  const gridStart = dayjs(`${year}-${month}-01`).day();
  const isFirst = isFirstMonth(logs as Log[], monthInView);
  const isCurrentMonth = month === dayjs().month() + 1;

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
      paperSx={{ pt: 1, borderRadius: 6 }}
      icon={<CalendarSvg />}
    >
      <Container>
        <Stack
          alignItems="center"
          p={2}
          pr={1}
          sx={{
            border: "1px solid #D5DAF5", //#DCDEE6",
            borderRadius: 6,
          }}
        >
          <Typography color="primary" sx={{ fontSize: 12 }}>
            {year}
          </Typography>
          <Stack direction="row" width={1} mb={2}>
            <Button onClick={back} startIcon={<BackSvg />} disabled={isFirst} />
            <Typography variant="h6" textAlign="center" width="90%">
              {dayjs.months()[month - 1]}
            </Typography>
            <Button
              onClick={next}
              startIcon={<NextSvg />}
              disabled={isCurrentMonth}
            />
          </Stack>
          <Grid container columns={7} xs={7} rowSpacing={0.5}>
            {<Grid item xs={gridStart} mr={-0.4} />}
            {formattedLogs.map((log, i) => (
              <Grid key={i} item xs={1}>
                <DayTile log={log} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </PopIt>
  );
};

const filterLogs = (logs: Log[], monthInView: MonthYear) => {
  const [month, year] = monthInView;
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
