import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Box, Button } from "@mui/material";

const Home: NextPage = () => (
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
    <Link href="/enter">
      <Button variant={"text"} sx={{ marginBottom: "20px" }}>
        wow, this is a great idea! let's get started already 😛{" "}
      </Button>
    </Link>
    <Image
      src="https://media.giphy.com/media/054ZPjUUVPHPwrzpHJ/giphy.gif"
      width="500px"
      height="300px"
    />
  </Box>
);

export default Home;
