import Link from "next/link";
import Image from "next/image";
import { Box, Typography, Button } from "@mui/material";
import type { SxProps } from "@mui/system";
import {
  useUserDoc,
  useEventsCollection,
  useWebhooksCollection,
} from "@lib/firebase/firestore";
import type { Timestamp } from "firebase/firestore";
import { SetGoalModal } from "./SetGoalModal";
import { Ring } from "./Ring";
import { EventsPopper } from "./events-popper";
import type { Log } from "components";

export interface RepoEvent {
  createdAt: Timestamp;
  dateString: string;
  eventType: string;
  repo: string;
  message: string;
  url: string;
}

interface DevRingProps {
  userId: string;
  log?: Log; // TODO: How do I type this to be conditional? I.e., if isToday is omitted, log is required
  isToday?: boolean;
}

// TODO: Can delete once I resolve comment above
const emptyLog = ["", { actual: 0, goal: 0 }] as Log;

export const DevRing = ({
  userId,
  log = emptyLog,
  isToday = false,
}: DevRingProps) => {
  const userData = useUserDoc(userId);
  const events = useEventsCollection(userId);
  const repos = useWebhooksCollection(userId);

  if (!userData || !events) return null;

  if (!repos)
    return (
      <Link href="/repos" passHref>
        <Button>{`You aren't tracking any repos! Head to the repos page to add more`}</Button>
      </Link>
    );

  // TODO: Can delete this once I programmatically initialize dailyGoal
  const hasGoal = Object.prototype.hasOwnProperty.call(userData, "dailyGoal");
  if (!hasGoal) return <SetGoalModal userId={userId} />;
  const { dailyGoal } = userData;

  // TODO: Improve this
  if (!log) return null;
  const [dateString, { actual, goal }] = log;

  // TODO: Test this a bunch! Can't have any timezone mishaps
  const dateStringFilter = isToday
    ? new Date().toLocaleDateString().replace(/\//g, "-")
    : dateString;

  const dayEvents = filterEventsByDateString(events, dateStringFilter);
  const hasDayEvents = dayEvents.length > 0;

  if (isToday && !hasDayEvents)
    return (
      <Box sx={containerSx}>
        <Typography variant="h4" sx={{ pb: 5 }}>
          {`No code committed today – push a commit to see it here!`}
        </Typography>
        <Image
          src="https://media.giphy.com/media/Yx5ns1mSPBle0/giphy.gif"
          height={500}
          width={700}
        />
      </Box>
    );

  return (
    <Box sx={containerSx}>
      <Ring
        progress={isToday ? dayEvents.length : actual}
        goal={isToday ? dailyGoal : goal}
      />
      {hasDayEvents && <EventsPopper events={dayEvents} />}
    </Box>
  );
};

// TODO: Test this a bunch! Can't have any timezone mishaps
const filterEventsByDateString = (events: RepoEvent[], dateString: string) => {
  const dateStringEvents = events.map((event) => [
    event.createdAt.toDate().toLocaleDateString().replace(/\//g, "-"), // MM-DD-YYYY
    event,
  ]);

  return dateStringEvents
    .filter((event) => event[0] === dateString)
    .map((event) => event[1]) as RepoEvent[];
};

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as SxProps;
