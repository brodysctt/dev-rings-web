import Link from "next/link";
import { useAuth } from "@lib/firebase/auth";
import { Box, Button } from "@mui/material";
import { TrackRepoInput, CalendarPopper, Sidebar } from "components";
import { SetGoalPopper } from "./set-goal-popper";

export const Navbar = () => {
  const userId = useAuth();
  if (!userId) return null;
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
        <SetGoalPopper userId={userId} />
        <TrackRepoInput userId={userId} />
      </Box>
      <Sidebar userId={userId} />
    </Box>
  );
};
