import Link from "next/link";
import Image from "next/image";
import { Box, Typography, Button } from "@mui/material";
import type { SxProps } from "@mui/system";
import {
  useUserDoc,
  useEventsCollection,
  useWebhooksCollection,
} from "@lib/firebase/firestore";
import { Ring } from "./Ring";
import { getDayEvents, createDateString } from "./utils";
import { EventsPopper } from "./events-popper";

export const TodayDevRing = ({ userId }: { userId: string }) => {
  const userData = useUserDoc(userId);
  const events = useEventsCollection(userId);
  const repos = useWebhooksCollection(userId);

  if (!userData || !events) return null;

  // TODO: Add a TrackRepo component here
  if (!repos)
    return (
      <Link href="/repos" passHref>
        <Button>{`You aren't tracking any repos! Head to the repos page to add more`}</Button>
      </Link>
    );

  const { dailyGoal } = userData;
  // TODO: Test this a bunch! Can't have any timezone mishaps
  const dateString = createDateString();
  const dayEvents = getDayEvents(events, dateString);
  const hasDayEvents = dayEvents.length > 0;

  if (!hasDayEvents)
    return (
      <Box sx={containerSx}>
        <Typography variant="h4" sx={{ pb: 5 }}>
          {`No code committed today – push a commit to see it here!`}
        </Typography>
        <Image
          src="https://media.giphy.com/media/Yx5ns1mSPBle0/giphy.gif"
          alt=""
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

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as SxProps;
