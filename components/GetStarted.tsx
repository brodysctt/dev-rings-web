import { useState, useEffect } from "react";
import Image from "next/image";
import { useCollection, useUserDoc } from "@lib/firebase/firestore";
import type { RepoEvent } from "@lib/firebase/firestore";
import { Box, Typography } from "@mui/material";
import type { SxProps } from "@mui/system";
import { CompletedRing } from "components";

interface Props {
  repos: string[];
  onSuccess?: () => void;
}

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
      <Box sx={{ display: "flex" }}>
        <Typography
          align="center"
          variant="h6"
          sx={{ color: "primary.main", mr: 1 }}
        >
          {isOnboarding
            ? `You're all set! Push changes to ${repos[0]} to see your first Dev
          Ring`
            : `Push changes to ${repos[randomIndex]} to kick off today's progress`}
        </Typography>
        <Image src="/blobhighfive.png" width={30} height={30} />
      </Box>
      <CompletedRing />
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
