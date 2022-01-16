import type { NextPage } from "next";
import type { SxProps } from "@mui/system";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {
  TrackEmAllButton,
  TrackRepoCheckboxes,
  TrackRepoInput,
} from "components";

const ManageRepos: NextPage = () => (
  <Box sx={containerSx}>
    <Box sx={{ display: "flex" }}>
      <TrackEmAllButton />
      <Divider orientation="vertical" sx={{ ml: 5 }} />
      <TrackRepoInput />
    </Box>
    <Divider sx={{ width: "50vw", my: 3 }} />
    <TrackRepoCheckboxes />
  </Box>
);

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  width: 1,
  height: "80vh",
  mt: 10,
} as SxProps;

export default ManageRepos;
