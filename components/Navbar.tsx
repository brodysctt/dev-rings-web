import Link from "next/link";
import { auth } from "@lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { SignOutButton, CreateWebhookInput } from "components";
import { Box, Button } from "@mui/material";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  if (user) {
    const {
      // @ts-ignore
      reloadUserInfo: { screenName: userId },
    } = user;
    console.log(`this mans is logged in: ${userId}`);

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          height: "60px",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Link href="/dev-rings">
            <Button variant="contained">DEV RINGS</Button>
          </Link>

          <CreateWebhookInput userId={userId} />
        </Box>
        <SignOutButton />
      </Box>
    );
  }
  return null;
};
