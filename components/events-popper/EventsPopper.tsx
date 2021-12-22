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
import type { RepoEvent } from "@lib/firebase/firestore";
import { getTimeAsString } from "utils";
import { EventIcon } from "./EventIcon";

export const EventsPopper = ({ events }: { events: RepoEvent[] }) => {
  const chronologicalEvents = [...events].reverse();
  return (
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
                      justifyContent: "center",
                      flexWrap: "wrap",
                      width: 800,
                      p: 2,
                    }}
                  >
                    {chronologicalEvents.map((event, i) => {
                      const { createdAt, eventType, repo, message, url } =
                        event;
                      // TODO: Can use toLocaleTimeString() method here instead
                      const time = getTimeAsString(createdAt);
                      return (
                        <Tooltip key={i} title={`${time} | ${repo}`}>
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
                            sx={{ pl: 1, mr: 1, mb: 1 }}
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
};

const iconContainerSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  bgcolor: "primary.main",
  borderRadius: 2,
  height: 25,
};
