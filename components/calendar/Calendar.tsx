import { useState } from "react";
import { Box } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { Month } from "./Month";

export const Calendar = () => {
  const currentMonth = logs.length - 1;
  const [month, setMonth] = useState(currentMonth);
  return (
    <Month
      logs={logs[month]}
      hasPrevious={month !== 0}
      hasNext={month !== logs.length - 1}
      monthIndex={month}
      setMonth={setMonth}
    />
  );
};
// Oct 29 --> Nov 3
// Not exactly sure how it would be structured, this would be a good thing to have on lock
const logs = [
  [
    { createdAt: Timestamp.fromMillis(1635552720000), progress: 3, goal: 4 },
    { createdAt: Timestamp.fromMillis(1635639120000), progress: 3, goal: 6 },
    { createdAt: Timestamp.fromMillis(1635725520000), progress: 2, goal: 3 },
  ],
  [
    { createdAt: Timestamp.fromMillis(1635811920000), progress: 3, goal: 3 },
    { createdAt: Timestamp.fromMillis(1635898320000), progress: 3, goal: 8 },
    { createdAt: Timestamp.fromMillis(1635984720000), progress: 4, goal: 7 },
    { createdAt: Timestamp.fromMillis(1636011720000), progress: 4, goal: 7 }, // 4
    { createdAt: Timestamp.fromMillis(1636111720000), progress: 4, goal: 7 },
    { createdAt: Timestamp.fromMillis(1636211720000), progress: 4, goal: 7 },
    { createdAt: Timestamp.fromMillis(1636311720000), progress: 4, goal: 7 },
    { createdAt: Timestamp.fromMillis(1636411720000), progress: 4, goal: 7 },
  ],
];

// const days = [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
//   23, 24, 25, 26, 27, 28, 29, 30,
// ];
