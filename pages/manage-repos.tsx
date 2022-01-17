import type { NextPage } from "next";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {
  TrackEmAllButton,
  TrackRepoCheckboxes,
  TrackRepoInput,
} from "components";

const ManageRepos: NextPage = () => (
  <Stack alignItems="center" height="80vh" mt={20}>
    <Box sx={{ display: "flex" }}>
      <TrackEmAllButton />
      <Divider orientation="vertical" sx={{ ml: 5 }} />
      <TrackRepoInput />
    </Box>
    <Divider sx={{ width: "50vw", my: 3 }} />
    <TrackRepoCheckboxes />
  </Stack>
);

export default ManageRepos;
