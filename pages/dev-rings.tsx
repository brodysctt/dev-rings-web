import type { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import { auth } from "@lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { SignInButton, DevRing } from "components";

const DevRings: NextPage = () => {
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
          justifyContent: "space-around",
          alignItems: "center",
          height: "60vh",
          width: "100%",
        }}
      >
        <DevRing userId={userId} />
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

export default DevRings;
