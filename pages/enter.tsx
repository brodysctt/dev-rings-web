import { useRouter } from "next/router";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Typography, Button } from "@mui/material";
import { useAuth, githubSignIn } from "@lib/firebase/auth";

const Enter = () => {
  const { user } = useAuth();
  const router = useRouter();
  if (user) router.push("/");
  return (
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
