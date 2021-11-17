import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import type { Timestamp } from "firebase/firestore";
import { Ring, RADIUS } from "./Ring";

export interface PushEvent {
  createdAt: Timestamp;
  eventType: string;
  repo: string;
  url: string;
}

interface DevRingProps {
  goal: number;
  events: PushEvent[];
}

export const DevRing = ({ goal, events }: DevRingProps) => {
  const [offset, setOffset] = useState(0);
  const progress = events.length;

  useEffect(() => {
    const circumference = 2 * Math.PI * RADIUS;
    const progressOffset = (goal - progress / goal) * circumference;
    setOffset(progressOffset);
  }, [progress, offset]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          borderRadius: "50%",
          height: "120px",
          width: "120px",
          bgcolor: "white",
        }}
      />
      <Ring offset={offset} />
    </Box>
  );
};
