import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { TrackRepoCheckboxes, TrackEmAllButton } from ".";

export const TrackPublicRepos = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        pb: 0,
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <TrackEmAllButton />
        <Divider sx={{ width: "50vw", my: 3 }} />
      </Box>
      <TrackRepoCheckboxes />
    </Box>
  );
};
