import { useEffect } from "react";
import type { NextPage } from "next";
import type { SxProps } from "@mui/system";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {
  TrackEmAllButton,
  TrackRepoCheckboxes,
  TrackRepoInput,
} from "components";
import { trackReposToast } from "@lib/react-toastify";

const ManageRepos: NextPage = () => {
  useEffect(() => {
    trackReposToast();
  }, []);
  return (
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
};

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  width: 1,
  height: "80vh",
  mt: 20, // TODO: Do this better
} as SxProps;

export default ManageRepos;
