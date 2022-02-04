import { useState, useEffect } from "react";
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
  const [days, setDays] = useState<JSX.Element[] | null>(null);
  const [close, setClose] = useState(false);
  const logs = useCollection("logs");

  useEffect(() => {
    if (!logs) return;
    const logsInView = filterLogs(logs as Log[], monthInView);
    const days = formatLogs(logsInView, monthInView).map((log) => (
      <Grid key={log[0]} item xs={1} onClick={() => setClose(true)}>
        <DayTile log={log} />
      </Grid>
    ));
    setDays(days);
  }, [logs, monthInView]);

  if (!logs) return null;

  const [month, year] = monthInView;
  const gridStart = dayjs(`${year}-${month}-01`).day();
  const isFirstMonth = checkFirstMonth(logs as Log[], monthInView);
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
      close={close}
      id="View calendar"
      paperSx={{ pt: 1, borderRadius: 6 }}
      icon={
        <Stack direction="row">
          <CalendarSvg />
          <Typography ml={1.5}>{`Calendar`}</Typography>
        </Stack>
      }
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
            <Button
              onClick={back}
              startIcon={<BackSvg />}
              disabled={isFirstMonth}
            />
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
            {days?.map((day) => day)}
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

const checkFirstMonth = (logs: Log[], monthInView: MonthYear) => {
  const firstLogDate = dayjs.min(logs.map(([dateString]) => dayjs(dateString)));
  const firstMonth = getMonthYear(firstLogDate);
  return JSON.stringify(monthInView) === JSON.stringify(firstMonth);
};
