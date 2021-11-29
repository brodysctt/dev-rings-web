import { Button, Popper, Fade, Paper } from "@mui/material";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import { Calendar } from "components";

export const CalendarPopper = ({ userId }: { userId: string }) => (
  <PopupState variant="popper" popupId="demo-popup-popper">
    {(popupState) => (
      <>
        <Button
          variant="text"
          {...bindToggle(popupState)}
          sx={{ height: 60, ml: 1 }}
        >
          <CalendarTodayRoundedIcon />
        </Button>
        <Popper {...bindPopper(popupState)} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper elevation={0} sx={{ p: 2 }}>
                <Calendar userId={userId} />
              </Paper>
            </Fade>
          )}
        </Popper>
      </>
    )}
  </PopupState>
);
