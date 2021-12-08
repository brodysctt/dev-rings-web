import Link from "next/link";
import { useAuth, getUserId } from "@lib/firebase/auth";
import { Box, Button } from "@mui/material";
import { CreateWebhookInput, CalendarPopper, Sidebar } from "components";

export const Navbar = () => {
  const { user } = useAuth();
  if (!user) return null;
  const userId = getUserId(user);
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
        <CalendarPopper userId={userId} />
        <CreateWebhookInput userId={userId} />
      </Box>
      <Sidebar userId={userId as string} />
    </Box>
  );
};
