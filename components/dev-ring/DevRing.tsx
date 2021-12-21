import type { FC } from "react";
import { Box } from "@mui/material";
import type { SxProps } from "@mui/system";
import { useEventsCollection } from "@lib/firebase/firestore";
import { EventsPopper } from "./events-popper";
import { getDayEvents } from "./utils";

export const DevRing: FC<{ userId: string; dateString: string }> = ({
  userId,
  dateString,
  children,
}) => {
  const events = useEventsCollection(userId);
  if (!events) return null;
  const dayEvents = getDayEvents(events, dateString);

  return (
    <Box sx={containerSx}>
      {children}
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
