import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Ring, RADIUS } from "./Ring";

// TODO: Updates types
export const DevRing = ({ events }: { events: any }) => {
  const [offset, setOffset] = useState(0);

  const progress = events.length;
  // TODO: Make this dynamic
  const target = 5;

  useEffect(() => {
    const circumference = 2 * Math.PI * RADIUS;
    const progressOffset = (target - progress / target) * circumference;
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
