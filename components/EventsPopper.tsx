import { Box, Typography, Chip, Tooltip } from "@mui/material";
import type { RepoEvent } from "@lib/firebase/firestore";
import { getTimeAsString } from "utils";
import { PopIt, EventSvg } from "components";

export const EventsPopper = ({ events }: { events: RepoEvent[] }) => {
  const chronologicalEvents = [...events].reverse();
  return (
    <PopIt
      id="events"
      icon={
        <Box sx={iconContainerSx}>
          <EventSvg variant="contained" />
        </Box>
      }
    >
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
          const { createdAt, eventType, repo, message, url } = event;
          // TODO: Can use toLocaleTimeString() method here instead
          const time = getTimeAsString(createdAt);
          return (
            <Tooltip key={i} title={`${time} | ${repo}`}>
              <Chip
                icon={<EventSvg type={eventType} variant="outline" />}
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
    </PopIt>
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
