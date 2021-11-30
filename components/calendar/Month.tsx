import type { Dispatch, SetStateAction } from "react";
import { Grid, Typography, Button } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { DayTile, DayLog, MonthYear } from "components";
import { getMonthName } from "utils";

interface MonthProps {
  logs: DayLog[];
  hasPrevious: boolean;
  hasNext: boolean;
  monthInView: MonthYear;
  setMonthInView: Dispatch<SetStateAction<MonthYear>>;
}

export const Month = ({
  logs,
  hasPrevious,
  hasNext,
  monthInView,
  setMonthInView,
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
        {logs.map((log, i) => (
          <DayTile key={i} log={log} />
        ))}
      </Grid>
    </>
  );
};
