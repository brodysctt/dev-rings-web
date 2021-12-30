import Link from "next/link";
import { useAuth } from "@lib/firebase/auth";
import { Box, Button } from "@mui/material";
import type { SxProps } from "@mui/system";
import {
  TrackRepoInput,
  CalendarPopper,
  Sidebar,
  SetGoalPopper,
} from "components";

export const Navbar = () => {
  const userId = useAuth();
  if (!userId) return null;
  return (
    <Box sx={containerSx}>
      <Box sx={{ display: "flex" }}>
        <Link href="/" passHref>
          <Button variant="contained" sx={{ ml: 2, mr: 2 }}>
            view today
          </Button>
        </Link>
        <CalendarPopper />
        <SetGoalPopper />
        <TrackRepoInput />
      </Box>
      <Sidebar />
    </Box>
  );
};

const containerSx = {
  display: "flex",
  justifyContent: "space-around",
  height: 60,
  width: "100%",
  mt: 3,
} as SxProps;
