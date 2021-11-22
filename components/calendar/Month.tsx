import { Grid } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { CalendarTile } from "components";

export interface Log {
  createdAt: Timestamp;
  progress: number;
  goal: number;
}

export const Month = ({ logs }: { logs: Log[] }) => {
  const { createdAt: firstLogTimestamp } = logs[0];
  const monthStart = firstLogTimestamp.toDate().getDay();
  return (
    <Grid container columns={7} sx={{ width: 420 }}>
      {<Grid item xs={monthStart} />}
      {days.map((day) => (
        <CalendarTile day={day} progress={2} goal={3} />
      ))}
    </Grid>
  );
};

const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];
