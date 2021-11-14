import type { NextPage } from "next";
import Link from "next/link";
import { Box } from "@mui/material";

const Home: NextPage = () => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Link href="/enter">
        {"wow, this is a great idea! let's get started already 😛"}
      </Link>
    </Box>
  );
};

export default Home;
