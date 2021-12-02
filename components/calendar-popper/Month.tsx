import type { Dispatch, SetStateAction } from "react";
import { Grid, Typography, Button } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { DayTile } from "./DayTile";
import { MonthYear, Log } from "components";
import { getMonthName } from "utils";

interface MonthProps {
  logs: Log[];
  hasPrevious: boolean;
  hasNext: boolean;
  monthInView: MonthYear;
  setMonthInView: Dispatch<SetStateAction<MonthYear>>;
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>;
}

export const Month = ({
  logs,
  hasPrevious,
  hasNext,
  monthInView,
  setMonthInView,
  setAnchorEl,
}: MonthProps) => {
  const [month, year] = monthInView;
  const monthName = getMonthName(month);

  const dayLogs = createDayLogs(logs, hasPrevious, monthInView);

  const [firstDate] = dayLogs[0];
  const gridStart = new Date(firstDate).getDay();

  const decrementMonth = () => {
    if (month === 1) {
      setMonthInView([12, year - 1]);
      return;
    }
    setMonthInView([month - 1, year]);
  };
  const incrementMonth = () => {
    if (month === 12) {
      setMonthInView([1, year + 1]);
      return;
    }
    setMonthInView([month + 1, year]);
  };

  return (
    <>
      <Grid container justifyContent="center" sx={{ mb: 2 }}>
        <Button
          variant="text"
          onClick={decrementMonth}
          disabled={!hasPrevious}
          startIcon={<ArrowBackRoundedIcon />}
        />
        <Grid item xs={8}>
          <Typography variant="h6" textAlign="center">
            {monthName}
          </Typography>
        </Grid>
        <Button
          variant="text"
          onClick={incrementMonth}
          disabled={!hasNext}
          endIcon={<ArrowForwardRoundedIcon />}
        />
      </Grid>
      <Grid container columns={7} gap={"3px"}>
        {<Grid item xs={gridStart} sx={{ mr: "-3px" }} />}
        {dayLogs.map((log, i) => (
          <DayTile key={i} log={log} setAnchorEl={setAnchorEl} />
        ))}
      </Grid>
    </>
  );
};

type ZeroIndexDayLog = [
  number, // zero-indexed day of month
  {
    actual: number;
    goal: number;
  }
];

const createDayLogs = (
  logs: Log[],
  hasPrevious: boolean,
  monthInView: MonthYear
) => {
  const dayLogs: ZeroIndexDayLog[] = logs.map((log) => {
    const [dateString, rest] = log;
    return [new Date(dateString).getDate() - 1, rest];
  });
  const [[firstDay]] = dayLogs;

  let i = 0;
  let dayOffIndexes = [];
  for (const dayLog of dayLogs) {
    const dayCount = !hasPrevious ? i + firstDay : i;
    const [day] = dayLog;
    const daysOff: number = day - dayCount;
    if (daysOff > 0) {
      for (let i = 0; i < daysOff; i++) {
        dayOffIndexes.push(dayCount + i);
      }
      i = i + daysOff;
    }
    i++;
    console.log(`here be i: ${i}`);
  }
  console.log("here be the indexes to add empty tiles:");
  console.dir(dayOffIndexes);

  dayOffIndexes.forEach((dayOffIndex) => {
    dayLogs.splice(dayOffIndex, 0, [dayOffIndex, { actual: 0, goal: 0 }]);
  });

  const [month, year] = monthInView;
  const completeLogs: Log[] = dayLogs.map((dayLog) => {
    const [zeroIndexDay, rest] = dayLog;
    const day = zeroIndexDay + 1;
    const dayString = day < 10 ? `0${day}` : day.toString();
    const dateString = `/${month}-${dayString}-${year}`;
    return [dateString, rest];
  });
  console.log("here be the complete day logs array");
  console.dir(completeLogs);
  return completeLogs;
};
