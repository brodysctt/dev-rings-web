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
    <Box>
      <Grid container justifyContent="center" sx={{ mb: 2 }}>
        {/* Could refactor these buttons, but gonna hold off for now */}
        {hasPrevious && (
          <Button
            variant="text"
            // Kinda surprised I'm not getting a type error here, cuz it could be undefined 🤷‍♂️
            onClick={() => setMonth(monthIndex - 1)}
            startIcon={<ArrowBackRoundedIcon />}
          />
        )}
        <Grid item xs={8}>
          <Typography variant="h6" textAlign="center">
            {month}
          </Typography>
        </Grid>
        {hasNext && (
          <Button
            variant="text"
            onClick={() => setMonth(monthIndex + 1)}
            endIcon={<ArrowForwardRoundedIcon />}
          />
        )}
      </Grid>
      <Grid container columns={7} sx={{ width: 420 }}>
        {<Grid item xs={monthStart} />}
        {[...logs].map((log) => (
          <DayTile log={log} />
        ))}
      </Grid>
    </Box>
  );
};
