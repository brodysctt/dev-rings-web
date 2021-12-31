import Image from "next/image";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import type { SxProps } from "@mui/system";

// TODO: Test image
export const KickOffHero = ({ repos }: { repos: string[] }) => {
  const [randomIndex, setRandomIndex] = useState<number>(0);

  useEffect(() => {
    setRandomIndex(getRandomInt(repos.length));
  }, [0]);

  return (
    <Box sx={containerSx}>
      {/* TODO: Make the name-dropped repo a link to github */}
      <Typography variant="h5" sx={{ mb: 6, color: "primary.main" }}>
        {`Push changes to ✨ ${repos[randomIndex]} ✨ to kick off today's progress 🚀`}
      </Typography>
      <Image
        src="https://media.giphy.com/media/Yx5ns1mSPBle0/giphy.gif"
        alt=""
        height={280}
        width={470}
      />
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
