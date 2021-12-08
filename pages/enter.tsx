import type { NextPage } from "next";
import { Box } from "@mui/material";
import { useAuth } from "@lib/firebase";
import { SignInButton } from "components";

const Enter: NextPage = () => {
  const { user } = useAuth();
  if (!user)
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

  // TODO: Redirect to today's dev ring
  return null;
};

export default Enter;
