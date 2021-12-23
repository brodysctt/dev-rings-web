import Image from "next/image";
import { Box, Typography } from "@mui/material";
import type { SxProps } from "@mui/system";

// TODO: Test image
export const KickOffHero = ({ repos }: { repos: string[] }) => (
  <Box sx={containerSx}>
    <Typography variant="h6" sx={{ mb: 5, color: "primary.main" }}>
      {`Push changes to ✨${repos[0]} ✨ ${
        repos.length > 1
          ? `(or any of the ${repos.length - 1} other repos you're tracking)`
          : ""
      } to kick off today's progress 🚀`}
    </Typography>
    <Typography>hi</Typography>
    <Image
      src="https://media.giphy.com/media/Yx5ns1mSPBle0/giphy.gif"
      alt=""
      height={250}
      width={400}
    />
  </Box>
);

const containerSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
  width: "100%",
} as SxProps;
