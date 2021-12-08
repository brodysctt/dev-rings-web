import type { NextPage } from "next";
import Image from "next/image";
import { Box, Button } from "@mui/material";
import { githubSignIn } from "@lib/firebase/auth";

const Enter: NextPage = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      width: 1,
      height: "100vh",
    }}
  >
    <SignInButton />
  </Box>
);

export default Enter;

const SignInButton = () => (
  <Button
    variant="contained"
    onClick={githubSignIn}
    sx={{
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      height: 60,
      width: 270,
    }}
  >
    <Image src="/github.png" width={30} height={30} />
    Sign in with GitHub
  </Button>
);
