import Link from "next/link";
import { useAuth } from "@lib/firebase/auth";
import { Grid, Box, Button, Tooltip } from "@mui/material";
import {
  CalendarPopper,
  ProgressRing,
  SidebarDial,
  SetGoalPopper,
} from "components";

export const Navbar = () => {
  const userId = useAuth();
  if (!userId) return null;
  return (
    <Grid container sx={{ height: 60, pl: 20, mt: 4 }}>
      <Grid item xs={8}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link href="/" passHref>
            <Tooltip title="View today's progress">
              <Button variant="text" sx={{ p: 2 }}>
                <ProgressRing percent={100} size={26} mb={false} />
              </Button>
            </Tooltip>
          </Link>
          <CalendarPopper />
          <SetGoalPopper />
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
