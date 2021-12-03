import { useContext } from "react";
import { UserContext } from "@lib/context";
import type { NextPage } from "next";
import { Box } from "@mui/material";
import { SignInButton, WebhookOnboarding } from "components";

const Enter: NextPage = () => {
  const { userId } = useContext(UserContext);

  if (!userId) {
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
  }

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
};

export default Enter;
