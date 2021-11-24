import { Box, Typography } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { Ring } from "../dev-ring/Ring";

export interface Log {
  createdAt: Timestamp;
  progress: number;
  goal: number;
}

export const DayTile = ({ log }: { log: Log }) => {
  const { createdAt, progress, goal } = log;
  const day = createdAt.toDate().getDate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: 60,
        width: 60,
        border: "3px solid #DCDEE6",
        borderRadius: 3,
        pt: "2px",
      }}
    >
      <Typography sx={{ fontSize: 10, alignSelf: "flex-end", mr: "4px" }}>
        {day}
      </Typography>
      <Ring progress={progress} goal={goal} size="mini" />
    </Box>
  );
};
