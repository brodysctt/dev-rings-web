import type { Dispatch, SetStateAction } from "react";
import type { Log } from "@lib/firebase/firestore";
import { dayjs, MonthYear, createMonthLogs, getMonthName } from "@lib/dayjs";
import { Grid, Typography, Button } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { DayTile } from "./DayTile";

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

  const monthLogs = createMonthLogs(logs, hasPrevious, monthInView);

  const [firstDate] = monthLogs[0];
  const gridStart = dayjs(firstDate).day();

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
        {monthLogs.map((log, i) => (
          <DayTile key={i} log={log} setAnchorEl={setAnchorEl} />
        ))}
      </Grid>
    </>
  );
};
