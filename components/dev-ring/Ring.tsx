import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import type { Timestamp } from "firebase/firestore";

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

export const Ring = ({ goal, events }: DevRingProps) => {
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
          height: 120,
          width: 120,
          bgcolor: "white",
        }}
      />
      <svg height={250} width={250} fill="#2A2A30">
        <linearGradient id="gradient" x1="100%" y1="100%" x2="70%" y2="40%">
          <stop offset="0%" stopColor="#CAD2F7" />
          <stop offset="100%" stopColor="#556cd6" />
        </linearGradient>
        <circle
          strokeWidth={32}
          strokeLinecap="round"
          stroke="url(#gradient)"
          r={RADIUS}
          cx={CENTER}
          cy={CENTER}
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
        />
      </svg>
    </Box>
  );
};

const RADIUS = 109;
const CENTER = 125;
const CIRC = 2 * Math.PI * RADIUS;
