import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ProgressRing } from "components";
import { githubSignIn, useAuth } from "@lib/firebase/auth";
import { useUserDoc } from "@lib/firebase/firestore";

const Enter = () => {
  const router = useRouter();
  const userId = useAuth();
  const userData = useUserDoc();

  if (!userId || !userData)
    return (
      <Stack justifyContent="center" alignItems="center" height="100vh">
        <ProgressRing
          values={[
            [1, 1],
            [1, 1],
          ]}
        />
        <Typography variant="h4" sx={{ my: 5, color: "primary.main" }}>
          {`Build momentum on your coding journey`}
        </Typography>
        <SignInButton />
      </Stack>
    );

  const { isOnboarding } = userData;
  if (isOnboarding) {
    router.push("/onboarding");
    return null;
  }
  router.push("/");
  return null;
};

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
