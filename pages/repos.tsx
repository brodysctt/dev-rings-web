import type { NextPage } from "next";
import { Box } from "@mui/material";
// import type { SxProps } from "@mui/system";
import { TrackReposPopper } from "components";

// TODO: Implement middleware so it's impossible to land on this without being authenticated
const Repos: NextPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: 1,
        flexDirection: "column",
        height: "60vh",
      }}
    >
      <TrackReposPopper />
    </Box>
  );
};

export default Repos;
