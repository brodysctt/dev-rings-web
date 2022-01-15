import { useEffect, useRef } from "react";
import { dayjs } from "@lib/dayjs";
import type { RepoEvent } from "@lib/firebase/firestore";
import { PopIt, CommitSvg } from "components";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import type { SxProps } from "@mui/system";

export const EventsPopper = ({ events }: { events: RepoEvent[] }) => {
  const chronologicalEvents = events
    .map((event) => [event.createdAt.toMillis(), event])
    .sort()
    .map(([, event]) => event as RepoEvent);
  return (
    <PopIt
      id="View events"
      icon={
        <Box sx={iconSx}>
          <CommitSvg />
        </Box>
      }
    >
      <EventsTimeline events={chronologicalEvents} />
    </PopIt>
  );
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
        const { createdAt, repo, message, url } = event;
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
                <CommitSvg />
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

const iconSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  bgcolor: "primary.main",
  borderRadius: 50,
  height: 25,
  px: 0.8,
  py: 2,
} as SxProps;
