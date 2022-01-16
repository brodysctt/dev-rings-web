import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@lib/firebase/auth";
import { useUserDoc } from "@lib/firebase/firestore";
import { Grid, Box, Button, Tooltip, CircularProgress } from "@mui/material";
import { CalendarPopper, SetGoalInput, SidebarDial } from "components";

export const Navbar = () => {
  const userId = useAuth();
  const userData = useUserDoc();
  if (!userId || !userData) return null;
  const [, { isOnboarding }] = userData;
  return (
    <Grid container sx={{ height: 60, pl: 20, mt: 4 }}>
      <Grid item xs={8}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!isOnboarding && (
            <>
              <ViewTodayRing />
              <CalendarPopper />
              <ManageRepos />
              <SetGoalInput />
            </>
          )}
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

const ViewTodayRing = () => (
  <Link href="/" passHref>
    <Tooltip title="View today's progress">
      <Button variant="text" sx={{ p: 2, height: 60 }}>
        <CircularProgress
          variant="determinate"
          size={26}
          thickness={6}
          value={100}
        />
      </Button>
    </Tooltip>
  </Link>
);

const ManageRepos = () => (
  <Link href="/repos" passHref>
    <Tooltip title="Manage repos">
      <Button variant="text" sx={{ p: 2, height: 60 }}>
        <Image src="/repo-icon.png" width={32} height={32} />
      </Button>
    </Tooltip>
  </Link>
);
