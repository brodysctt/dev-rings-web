import type { NextPage } from "next";
import { Box, Button } from "@mui/material";
import { Ring, RADIUS } from "components";
import { useState, useEffect } from "react";

const DevRings: NextPage = () => {
  const [progress, setProgress] = useState(20);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const circumference = 2 * Math.PI * RADIUS;
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);
  }, [progress, offset]);

  const incrementProgress = () => {
    console.log("Incrementing progress...");
    setProgress(progress + 5);
  };

  const decrementProgress = () => {
    console.log("Decrementing progress...");
    setProgress(progress - 5);
  };

  return (
    <Box sx={containerSx}>
      <Box sx={ringContainerSx}>
        <Box sx={dotSx} />
        <Ring offset={offset} />
      </Box>
      <Box sx={buttonContainerSx}>
        <Button
          variant="contained"
          onClick={() => incrementProgress()}
          sx={{ mb: "20px" }}
        >
          increase
        </Button>
        <Button variant="contained" onClick={() => decrementProgress()}>
          decrease
        </Button>
      </Box>
    </Box>
  );
};

export default DevRings;

const containerSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
} as const;

const ringContainerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "60vh",
} as const;

const dotSx = {
  position: "absolute",
  borderRadius: "50%",
  height: "120px",
  width: "120px",
  bgcolor: "white",
} as const;

const buttonContainerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  ml: "40px",
} as const;
