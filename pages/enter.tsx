import { useRouter } from "next/router";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Typography, Button } from "@mui/material";
import type { SxProps } from "@mui/system";
import { githubSignIn } from "@lib/firebase/auth";
import { useUserDoc } from "@lib/firebase/firestore";
import { ProgressRing } from "components";

const Enter = () => {
  const router = useRouter();
  const userData = useUserDoc();

  if (!userData)
    return (
      <Box sx={containerSx}>
        <ProgressRing percent={100} />
        <Typography variant="h4" sx={{ mt: 3, mb: 5, color: "primary.main" }}>
          {`Build momentum on your coding journey`}
        </Typography>
        <SignInButton />
      </Box>
    );

  const [, { isOnboarding }] = userData;
  if (isOnboarding) {
    router.push("/onboarding");
    return null;
  }
  router.push("/");
  return null;
};

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 1,
  height: "100vh",
} as SxProps;

export default Enter;

const SignInButton = () => (
  <Button
    variant="contained"
    onClick={githubSignIn}
    size="large"
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: 60,
      width: 250,
    }}
  >
    <GitHubIcon fontSize="large" />
    <Typography fontSize={14}> Sign in with GitHub </Typography>
  </Button>
);
