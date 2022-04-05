import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!userId || !userData)
    return (
      <Container>
        <Stack
          justifyContent="center"
          alignItems="center"
          height={isMobile ? "80vh" : "100vh"}
        >
          <ProgressRing size={isMobile ? 300 : 400} />
          <Typography
            variant={isMobile ? "h5" : "h4"}
            align="center"
            sx={{ my: 5, color: "primary.main" }}
          >
            {`Build momentum on your coding journey`}
          </Typography>
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
        </Stack>
      </Container>
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
