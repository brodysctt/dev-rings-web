import type { NextPage } from "next";
import { Box } from "@mui/material";
import { Calendar } from "components";
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
    <Calendar />
  </Box>
);

export default CalendarPage;
