import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import type { SxProps } from "@mui/system";

// TODO: "Push changes to one of your tracked repos to kick off today's progress"
// ^ Tooltip over "one of your tracked repos" that shows the first 10 or whatever
export const KickOffHero = ({ repos }: { repos: string[] }) => {
  const [randomIndex, setRandomIndex] = useState<number>(0);

  useEffect(() => {
    setRandomIndex(getRandomInt(repos.length));
  }, [0]);

  return (
    <Box sx={containerSx}>
      <Typography variant="h5" sx={{ mb: 6, color: "primary.main" }}>
        {`Push changes to ✨ ${repos[randomIndex]} ✨ to kick off today's progress 🚀`}
      </Typography>
    </Box>
  );
};

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
  width: "100%",
} as SxProps;

const getRandomInt = (max: number) => Math.floor(Math.random() * max);
