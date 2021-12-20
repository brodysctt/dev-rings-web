import Link from "next/link";
import Image from "next/image";
import { Box, Typography, Button } from "@mui/material";
import type { SxProps } from "@mui/system";
import {
  useUserDoc,
  useEventsCollection,
  useWebhooksCollection,
} from "@lib/firebase/firestore";
import { SetGoalModal } from "./SetGoalModal";
import { Ring } from "./Ring";
import type { RepoEvent } from "./DevRing";
import { EventsPopper } from "./events-popper";

export const TodayDevRing = ({ userId }: { userId: string }) => {
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

  // TODO: Test this a bunch! Can't have any timezone mishaps
  const dateStringFilter = new Date().toLocaleDateString().replace(/\//g, "-");

  const dayEvents = filterEventsByDateString(events, dateStringFilter);
  const hasDayEvents = dayEvents.length > 0;

  if (!hasDayEvents)
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
      <Ring progress={dayEvents.length} goal={dailyGoal} />
      <EventsPopper events={dayEvents} />
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
