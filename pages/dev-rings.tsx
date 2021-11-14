import type { NextPage } from "next";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

const DevRings: NextPage = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        width: "100%",
      }}
    >
      <Typography variant={"h4"} sx={{ marginBottom: "50px" }}>
        oh u better believe we about to get it 🤯
      </Typography>
      <Image
        src="https://media.giphy.com/media/QIA28gtOux7n7hyGXF/giphy.gif"
        width="500px"
        height="300px"
      />
    </Box>
  );
};

export default DevRings;
