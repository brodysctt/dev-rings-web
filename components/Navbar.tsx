import Link from "next/link";
import { Box, Button } from "@mui/material";
import type { SxProps } from "@mui/system";
import { TrackRepoInput, CalendarPopper, Sidebar } from "components";
import { SetGoalPopper } from "./set-goal-popper";

export const Navbar = () => (
  <Box sx={containerSx}>
    <Box sx={{ display: "flex" }}>
      <Link href="/" passHref>
        <Button variant="contained" sx={{ ml: 2 }}>
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

const containerSx = {
  display: "flex",
  justifyContent: "space-around",
  height: 60,
  width: "100%",
  mt: 3,
} as SxProps;
