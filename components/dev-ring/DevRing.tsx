import type { FC } from "react";
import { Box } from "@mui/material";
import type { SxProps } from "@mui/system";
import { useCollections } from "@lib/firebase/firestore";
import type { Timestamp } from "firebase/firestore";
import { EventsPopper } from "./events-popper";
import { getDayEvents } from "./utils";

export interface RepoEvent {
  createdAt: Timestamp;
  eventType: string;
  repo: string;
  message: string;
  url: string;
}

export const DevRing: FC<{ userId: string; dateString: string }> = ({
  userId,
  dateString,
  children,
}) => {
  const [events] = useCollections(userId);
  if (!events) return null;
  const dayEvents = getDayEvents(events as RepoEvent[], dateString);

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
