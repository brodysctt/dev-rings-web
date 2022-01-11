import type { NextPage } from "next";
import { Box } from "@mui/material";
import type { SxProps } from "@mui/system";
import {
  TrackEmAllButton,
  TrackRepoCheckboxes,
  TrackRepoInput,
} from "components";

const Repos: NextPage = () => (
  <Box sx={containerSx}>
    <TrackRepoCheckboxes />
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mt: 5,
      }}
    >
      <TrackEmAllButton />
      <TrackRepoInput />
    </Box>
  </Box>
);

export default Repos;

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 1,
  height: "60vh",
} as SxProps;
