import { Box } from "@mui/material";
import type { SxProps } from "@mui/system";
import { useEventsCollection } from "@lib/firebase/firestore";
import { Ring } from "./Ring";
import { EventsPopper } from "./events-popper";
import { getDayEvents } from "./utils";
import type { Log } from "components";

interface DevRingProps {
  userId: string;
  log: Log;
}

export const DevRing = ({ userId, log }: DevRingProps) => {
  const events = useEventsCollection(userId);
  if (!events) return null;

  const [dateString, { actual, goal }] = log;
  const dayEvents = getDayEvents(events, dateString);

  return (
    <Box sx={containerSx}>
      <Ring progress={actual} goal={goal} />
      <EventsPopper events={dayEvents} />
    </Box>
  );
};

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as SxProps;
