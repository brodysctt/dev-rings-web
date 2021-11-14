import type { NextPage } from "next";
import { Box } from "@mui/material";
import { Ring } from "components";

const DevRings: NextPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        width: "100%",
      }}
    >
      <Ring />
    </Box>
  );
};

export default DevRings;
