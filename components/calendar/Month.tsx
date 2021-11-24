import type { Dispatch, SetStateAction } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { DayTile, Log } from "components";
import { getMonthAsString } from "./utils/getMonthAsString";

interface MonthProps {
  logs: Log[];
  hasPrevious: boolean;
  hasNext: boolean;
  monthIndex: number;
  setMonth: Dispatch<SetStateAction<number>>;
}

export const Month = ({
  logs,
  hasPrevious,
  hasNext,
  monthIndex,
  setMonth,
}: MonthProps) => {
  const { createdAt: firstLogTimestamp } = logs[0];
  const monthStart = firstLogTimestamp.toDate().getDay();
  const month = getMonthAsString(firstLogTimestamp);
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
          onClick={() => setMonth(monthIndex - 1)}
          disabled={!hasPrevious}
          startIcon={<ArrowBackRoundedIcon />}
        />
        <Grid item xs={8}>
          <Typography variant="h6" textAlign="center">
            {month}
          </Typography>
        </Grid>
        <Button
          variant="text"
          onClick={() => setMonth(monthIndex + 1)}
          disabled={!hasNext}
          endIcon={<ArrowForwardRoundedIcon />}
        />
      </Grid>
      <Grid container columns={7} gap={"3px"}>
        {<Grid item xs={monthStart} sx={{ mr: "-3px" }} />}
        {logs.map((log) => (
          <DayTile log={log} />
        ))}
      </Grid>
    </Box>
  );
};
