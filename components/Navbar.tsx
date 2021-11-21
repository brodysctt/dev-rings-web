import Link from "next/link";
import { auth } from "@lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { CreateWebhookInput } from "components";
import { Box, Button } from "@mui/material";
import { Sidebar } from "./Sidebar";

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
          height: 60,
          width: "100%",
          mt: 3,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Link href="/dev-rings">
            <Button variant="contained" sx={{ ml: 2 }}>
              DEV RINGS
            </Button>
          </Link>
          <CreateWebhookInput userId={userId} />
        </Box>
        <Sidebar userId={userId as string} />
      </Box>
    );
  }
  return null;
};
