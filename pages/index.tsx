import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Box, Button } from "@mui/material";

const Home: NextPage = () => (
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
    <Link href="/enter">
      <Button variant={"text"} sx={{ marginBottom: "40px" }}>
        oh u better believe we about to get it 🤯
      </Button>
    </Link>
    <Image
      src="https://media.giphy.com/media/QIA28gtOux7n7hyGXF/giphy.gif"
      width="500px"
      height="300px"
    />
  </Box>
);

export default Home;
