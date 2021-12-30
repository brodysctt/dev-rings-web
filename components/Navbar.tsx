import Link from "next/link";
import { useAuth } from "@lib/firebase/auth";
import { Grid, Box, Button } from "@mui/material";
import {
  TrackRepoInput,
  CalendarPopper,
  SidebarDial,
  SetGoalPopper,
} from "components";

export const Navbar = () => {
  const userId = useAuth();
  if (!userId) return null;
  return (
    <Grid container sx={{ height: 60, pl: 20, mt: 4 }}>
      <Grid item xs={8}>
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
      </Grid>
      <Grid item xs={4} sx={{ pr: 20 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <SidebarDial />
        </Box>
      </Grid>
    </Grid>
  );
};
