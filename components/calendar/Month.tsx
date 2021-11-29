import type { Dispatch, SetStateAction } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { DayTile, DayLog } from "components";
import { getMonthName } from "utils";

interface MonthProps {
  logs: DayLog[];
  hasPrevious: boolean;
  hasNext: boolean;
  monthInView: number;
  setMonthInView: Dispatch<SetStateAction<number>>;
}

export const Month = ({
  logs,
  hasPrevious,
  hasNext,
  monthInView,
  setMonthInView,
}: MonthProps) => {
  const monthName = getMonthName(monthInView);
  const [firstDate] = logs[0];
  const gridStart = new Date(firstDate).getDay();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 480,
        border: "2px solid #DCDEE6", //#CAD2F7 #DCDEE6
        borderRadius: 10,
        p: 2,
      }}
    >
      <Grid container justifyContent="center" sx={{ mb: 2 }}>
        <Button
          variant="text"
          onClick={() => setMonthInView(monthInView - 1)}
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
          onClick={() => setMonthInView(monthInView + 1)}
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
    </Box>
  );
};
