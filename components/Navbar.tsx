import Link from "next/link";
import { useAuth, getUserId } from "@lib/firebase/auth";
import { Box, Button } from "@mui/material";
import { TrackRepoInput, CalendarPopper, Sidebar } from "components";

export const Navbar = () => {
  const { user } = useAuth();
  if (!user) return null;
  const userId = getUserId(user);
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
        <Link href="/" passHref>
          <Button variant="contained" sx={{ ml: 2 }}>
            view today
          </Button>
        </Link>
        <CalendarPopper userId={userId} />
        <TrackRepoInput userId={userId} />
      </Box>
      <Sidebar userId={userId as string} />
    </Box>
  );
};
