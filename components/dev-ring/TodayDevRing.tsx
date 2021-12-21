import Link from "next/link";
import Image from "next/image";
import { Box, Typography, Button } from "@mui/material";
import type { SxProps } from "@mui/system";
import {
  useUserDoc,
  useEventsCollection,
  useWebhooksCollection,
} from "@lib/firebase/firestore";
import { dayjs } from "@lib/dayjs";
import { setGoalToast, newTimezoneToast } from "@lib/react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const { dailyGoal, hasSetGoal, timezone } = userData;

  // TODO: Test this a bunch! Can't have any timezone mishaps
  const dateString = createDateString();
  const dayEvents = getDayEvents(events, dateString);
  const hasDayEvents = dayEvents.length > 0;

  const newTimezone = dayjs().utcOffset() !== dayjs().tz(timezone).utcOffset();
  if (newTimezone) newTimezoneToast(userId, timezone);

  // TODO: Make the name-dropped repo a link to github, and the "or other" piece a link to manage repos page
  if (!hasDayEvents) return <NoEventsHero repos={repos} />;

  if (!hasSetGoal) setGoalToast();

  return (
    <Box sx={containerSx}>
      <Ring progress={dayEvents.length} goal={dailyGoal} />
      <EventsPopper events={dayEvents} />
    </Box>
  );
};

const NoEventsHero = ({ repos }: { repos: any[] }) => (
  <Box sx={containerSx}>
    <Typography variant="h6" sx={{ mb: 5, color: "primary.main" }}>
      {`Push changes to ✨${repos[0]} ✨ ${
        repos.length > 1
          ? `(or any of the ${repos.length - 1} other repos you're tracking)`
          : ""
      } to kick off today's progress 🚀`}
    </Typography>
    <Image
      src="https://media.giphy.com/media/Yx5ns1mSPBle0/giphy.gif"
      alt=""
      height={250}
      width={400}
    />
  </Box>
);

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as SxProps;