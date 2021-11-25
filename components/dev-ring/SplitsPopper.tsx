import { Box, Button, Popper, Fade, Paper, Chip } from "@mui/material";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import type { PushEvent } from "components";
import { EventIcon } from "./EventIcon";

export const SplitsPopper = ({ events }: { events: PushEvent[] }) => (
  <PopupState variant="popper" popupId="demo-popup-popper">
    {(popupState) => (
      <>
        <Button variant="text" {...bindToggle(popupState)}>
          <Box sx={iconContainerSx}>
            <EventIcon variant="contained" />
          </Box>
        </Button>
        <Popper {...bindPopper(popupState)} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper elevation={0}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 2,
                  }}
                >
                  {events.map((event) => {
                    const { createdAt, eventType, repo, url } = event;
                    return (
                      <Chip
                        icon={<EventIcon type={eventType} variant="outline" />}
                        label={repo}
                        onClick={() => window.open(url)}
                        sx={{ pl: 1 }}
                      />
                    );
                  })}
                </Box>
              </Paper>
            </Fade>
          )}
        </Popper>
      </>
    )}
  </PopupState>
);

const iconContainerSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  bgcolor: "primary.main", // #CAD2F7
  borderRadius: 2,
  height: 25,
};
