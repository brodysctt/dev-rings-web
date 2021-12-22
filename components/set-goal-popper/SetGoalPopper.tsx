import { useState, MouseEvent } from "react";
import {
  Box,
  Typography,
  Button,
  Popper,
  Paper,
  ClickAwayListener,
} from "@mui/material";
import { useUserDoc } from "@lib/firebase/firestore";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { SetGoalInput } from "./SetGoalInput";

// TODO: Pass popper state down to input, close popper on goal submit

export const SetGoalPopper = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? "calendar-popper" : undefined;

  const userData = useUserDoc();
  if (!userData) return null;
  const [, { dailyGoal, hasSetGoal }] = userData;

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <Box>
        <Button
          aria-describedby={id}
          variant={!hasSetGoal ? "outlined" : "text"}
          onClick={(event: MouseEvent<HTMLElement>) => {
            setAnchorEl(anchorEl ? null : event.currentTarget);
          }}
          sx={{ height: 60 }}
        >
          <EmojiEventsIcon />
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Paper elevation={0}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SetGoalInput setAnchorEl={setAnchorEl} />
              <Typography
                color="primary.main"
                sx={{ mt: 1, fontSize: "12px" }}
              >{`Current goal is ${dailyGoal}`}</Typography>
            </Box>
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};
