import type { NextPage } from "next";
import { Box } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { CalendarTile } from "components";

const Calendar: NextPage = () => {
  const now = Timestamp.now();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px 4px",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: 450,
        }}
      >
        {days.map((day) => (
          <CalendarTile day={day} progress={2} goal={3} />
        ))}
      </Box>
    </Box>
  );
};

const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];

export default Calendar;
