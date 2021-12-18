import { useUserDoc } from "@lib/firebase/firestore";
import { Box, Button, Popper, Fade, Paper, Tooltip } from "@mui/material";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { SetGoalInput } from "./SetGoalInput";

// TODO: Refactor to use ClickAway pattern
// TODO: A target icon would be nice 🤷‍♂️ 🎯
// TODO: Finesse tooltip

export const SetGoalPopper = ({ userId }: { userId: string }) => {
  const userData = useUserDoc(userId);
  if (!userData) return null;
  const { dailyGoal: goal } = userData;

  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <>
          <Button variant="text" {...bindToggle(popupState)}>
            <Tooltip title={`Current goal is ${goal}`}>
              <EmojiEventsIcon />
            </Tooltip>
          </Button>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper elevation={0}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexWrap: "wrap",
                      width: 800,
                    }}
                  >
                    <SetGoalInput userId={userId} />
                  </Box>
                </Paper>
              </Fade>
            )}
          </Popper>
        </>
      )}
    </PopupState>
  );
};
