import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import type { SxProps } from "@mui/system";
import { ProgressRing } from "components";

// TODO: "Push changes to one of your tracked repos to kick off today's progress"
// ^ Tooltip over "one of your tracked repos" that shows the first 10 or whatever
// TODO: Recognize onboarding state – don't need to consider random in this case
export const KickOffHero = ({ repos }: { repos: string[] }) => {
  const [randomIndex, setRandomIndex] = useState<number>(0);

  useEffect(() => {
    setRandomIndex(getRandomInt(repos.length));
  }, [0]);

  return (
    <Box sx={containerSx}>
      <Typography variant="h6" sx={{ mb: 6, color: "primary.main" }}>
        {`Push changes to ✨ ${repos[randomIndex]} ✨ to kick off today's progress 🚀`}
      </Typography>
      {/* TODO: Would be amazing to rip an animation here that shows what it looks like to incrementally complete a ring */}
      <ProgressRing percent={1} />
    </Box>
  );
};

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as SxProps;

const getRandomInt = (max: number) => Math.floor(Math.random() * max);
