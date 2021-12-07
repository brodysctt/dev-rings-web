import type { NextPage } from "next";
import { Box } from "@mui/material";
import type { SxProps } from "@mui/system";
import { useAuth } from "@lib/firebase";
import { SignInButton, WebhookOnboarding } from "components";

const Enter: NextPage = () => {
  const { user } = useAuth();
  if (!user) {
    return (
      <Box sx={{ ...containerSx, height: "100vh" }}>
        <SignInButton />
      </Box>
    );
  }
  return (
    <Box sx={{ ...containerSx, flexDirection: "column", height: "70vh" }}>
      <WebhookOnboarding />
    </Box>
  );
};

export default Enter;

const containerSx = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  width: 1,
} as SxProps;
