import { useUserDoc } from "@lib/firebase/firestore";
import { Box, Typography, Button, Popper, Fade, Paper } from "@mui/material";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { SetGoalInput } from "./SetGoalInput";

// TODO: Refactor to use ClickAway pattern
// TODO: A target icon would be nice 🤷‍♂️ 🎯
// TODO: Finesse tooltip
// TODO: Implement validation so goal cannot be less than 1
// TODO: Pass popper state down to input, close popper on goal submit

export const SetGoalPopper = ({ userId }: { userId: string }) => {
  const userData = useUserDoc(userId);
  if (!userData) return null;
  const { dailyGoal, hasSetGoal } = userData;

  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <>
          <Button
            variant={!hasSetGoal ? "outlined" : "text"}
            {...bindToggle(popupState)}
          >
            <EmojiEventsIcon />
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
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <SetGoalInput userId={userId} />
                      <Typography
                        color="primary.main"
                        sx={{ mt: 1, fontSize: "12px" }}
                      >{`Current goal is ${dailyGoal}`}</Typography>
                    </Box>
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
