import { useRouter } from "next/router";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Typography, Button } from "@mui/material";
import { useAuth, githubSignIn } from "@lib/firebase/auth";
import { Ring } from "components";

const Enter = () => {
  const { user } = useAuth();
  const router = useRouter();
  if (user) router.push("/");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 1,
        height: "100vh",
      }}
    >
      <Ring progress={1} goal={1} />
      <Typography variant="h4" sx={{ mt: 3, mb: 5, color: "primary.main" }}>
        {`Gain momentum in your coding journey`}
      </Typography>
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
