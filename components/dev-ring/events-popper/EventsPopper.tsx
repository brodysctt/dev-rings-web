import {
  Box,
  Typography,
  Button,
  Popper,
  Fade,
  Paper,
  Chip,
  Tooltip,
} from "@mui/material";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import type { RepoEvent } from "components";
import { getTimeAsString } from "utils";
import { EventIcon } from "./EventIcon";

export const EventsPopper = ({ events }: { events: RepoEvent[] }) => (
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
                    const { createdAt, eventType, repo, message, url } = event;
                    const time = getTimeAsString(createdAt);
                    return (
                      <Tooltip title={`${time} | ${repo}`}>
                        <Chip
                          icon={
                            <EventIcon type={eventType} variant="outline" />
                          }
                          label={
                            <Typography textAlign="left" sx={{ p: 0 }}>
                              {message}
                            </Typography>
                          }
                          onClick={() => window.open(url)}
                          sx={{ pl: 1, mr: 1 }}
                        />
                      </Tooltip>
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
