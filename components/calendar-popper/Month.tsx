import type { Dispatch, SetStateAction } from "react";
import { Grid, Typography, Button } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { DayTile, DayLog } from "./DayTile";
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

  console.log("here be the logs from month component");
  console.dir(logs);

  const [firstDate] = logs[0];
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

  const dayLogs = createDayLogs(logs, hasPrevious);

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
          <DayTile
            key={i}
            log={log}
            monthInView={monthInView}
            setAnchorEl={setAnchorEl}
          />
        ))}
      </Grid>
    </>
  );
};

const createDayLogs = (logs: Log[], hasPrevious: boolean) => {
  const zeroIndexedDayLogs: DayLog[] = logs.map((log) => {
    const [dateString, rest] = log;
    return [new Date(dateString).getDate() - 1, rest];
  });
  const [[firstDay]] = zeroIndexedDayLogs;

  let i = 0;
  let daysOffIndexes = [];
  for (const dayLog of zeroIndexedDayLogs) {
    const dayCount = !hasPrevious ? i + firstDay : i;
    const [day] = dayLog;
    const daysOff: number = day - dayCount;
    if (daysOff > 0) {
      for (let i = 0; i < daysOff; i++) {
        daysOffIndexes.push(dayCount + i);
      }
      i = i + daysOff;
    }
    i++;
    console.log(`here be i: ${i}`);
  }
  console.log("here be the indexes to add empty tiles:");
  console.dir(daysOffIndexes);

  daysOffIndexes.forEach((dayOffIndex) => {
    zeroIndexedDayLogs.splice(dayOffIndex, 0, [
      dayOffIndex,
      { actual: 0, goal: 1 },
    ]);
  });

  const completeDayLogs: DayLog[] = zeroIndexedDayLogs.map(
    (zeroIndexDayLog) => {
      const [zeroIndexDay, rest] = zeroIndexDayLog;
      const day = zeroIndexDay + 1;
      return [day, rest];
    }
  );
  console.log("here be the complete day logs array");
  console.dir(completeDayLogs);
  return completeDayLogs;
};
