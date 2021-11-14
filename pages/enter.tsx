import type { NextPage } from "next";
import { auth } from "@lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { SignInButton, WebhookOnboarding } from "components";
import { Box, Typography, Button } from "@mui/material";

const Enter: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <Box>
        <Typography>Initialising User...</Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box>
        <Typography>Error: {error}</Typography>
      </Box>
    );
  }
  if (user) {
    const {
      // @ts-ignore
      reloadUserInfo: { screenName: userId },
    } = user;
    console.log(`this mans is logged in: ${userId}`);

    return (
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          height: "70vh",
          width: "100%",
        }}
      >
        <WebhookOnboarding userId={userId} />
      </Box>
    );
  }

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <SignInButton />
    </Box>
  );
};

export default Enter;
