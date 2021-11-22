import type { NextPage } from "next";
import { Box } from "@mui/material";
import { Calendar, Month } from "components";
import { Timestamp } from "firebase/firestore";

const CalendarPage: NextPage = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "60vh",
      width: "100%",
    }}
  >
    <Month logs={logs} />
  </Box>
);

export default CalendarPage;

export interface Log {
  createdAt: Timestamp;
  progress: number;
  goal: number;
}

const logs = [
  { createdAt: Timestamp.now(), progress: 3, goal: 4 },
  { createdAt: Timestamp.now(), progress: 3, goal: 4 },
  { createdAt: Timestamp.now(), progress: 3, goal: 4 },
  { createdAt: Timestamp.now(), progress: 3, goal: 4 },
  { createdAt: Timestamp.now(), progress: 3, goal: 4 },
];
