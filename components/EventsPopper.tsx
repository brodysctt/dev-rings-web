import { useEffect, useRef } from "react";
import { dayjs } from "@lib/dayjs";
import type { RepoEvent } from "@lib/firebase/firestore";
import { PopIt, EventSvg } from "components";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";

export const EventsPopper = ({ events }: { events: RepoEvent[] }) => {
  const chronologicalEvents = events
    .map((event) => [event.createdAt.toMillis(), event])
    .sort()
    .map(([, event]) => event as RepoEvent);
  return (
    <PopIt
      id="View events"
      icon={
        <Box sx={iconContainerSx}>
          <EventSvg variant="contained" />
        </Box>
      }
    >
      <EventsTimeline events={chronologicalEvents} />
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

const EventsTimeline = ({ events }: { events: RepoEvent[] }) => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current)
      ref.current.scrollIntoView({
        behavior: "smooth",
      });
  }, [ref]);

  return (
    <Timeline position="alternate">
      {events.map((event, i) => {
        const { createdAt, eventType, repo, message, url } = event;
        return (
          <TimelineItem key={i}>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {dayjs(createdAt.toDate()).format("LT")}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <EventSvg
                  type={eventType === "push" ? "push" : "pull_request"}
                  variant="contained"
                />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              onClick={() => window.open(url)}
              sx={{ py: "12px", px: 2, cursor: "pointer" }}
            >
              <Typography color="primary">{repo}</Typography>
              <Typography color="text.secondary">{message}</Typography>
            </TimelineContent>
          </TimelineItem>
        );
      })}
      <Box ref={ref} />
    </Timeline>
  );
};
