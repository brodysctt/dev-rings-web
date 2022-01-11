import { useState, useEffect } from "react";
import { useCollection, useUserDoc } from "@lib/firebase/firestore";
import type { RepoEvent } from "@lib/firebase/firestore";
import { Box, Typography } from "@mui/material";
import type { SxProps } from "@mui/system";
import { AnimatedRing } from "components";

interface Props {
  repos: string[];
  onSuccess?: () => void;
}

// TODO: "Push changes to one of your tracked repos to kick off today's progress"
// ^ Tooltip over "one of your tracked repos" that shows the first 10 or whatever
export const GetStarted = ({ repos, onSuccess }: Props) => {
  const [randomIndex, setRandomIndex] = useState<number>(0);

  useEffect(() => {
    setRandomIndex(getRandomInt(repos.length));
  }, [0]);

  const events = useCollection("events") as RepoEvent[] | null;
  const userData = useUserDoc();
  if (!userData) return null;
  const [, { isOnboarding }] = userData;

  if (isOnboarding && Boolean(events) && onSuccess) onSuccess();

  return (
    <Box sx={containerSx}>
      <Typography variant="h6" sx={{ color: "primary.main" }}>
        {isOnboarding
          ? `You're all set to start tracking progress! Make a change to ${repos[0]} to get started 💍`
          : `Push changes to ✨ ${repos[randomIndex]} ✨ to kick off today's progress 🚀`}
      </Typography>
      {/* TODO: Would be amazing to rip an animation of incrementally completing the ring */}
      {isOnboarding && <AnimatedRing />}
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
