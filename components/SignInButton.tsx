import Image from "next/image";
import { githubSignIn } from "@lib/firebase/auth";
import { Button } from "@mui/material";
import type { SxProps } from "@mui/system";

export const SignInButton = () => (
  <Button variant="contained" onClick={githubSignIn} sx={buttonSx}>
    <Image src="/github.png" width={30} height={30} />
    Sign in with GitHub
  </Button>
);

const buttonSx = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  height: 60,
  width: 270,
} as SxProps;
