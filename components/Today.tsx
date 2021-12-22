import Link from "next/link";
import Image from "next/image";
import { useUserDoc, useCollection, RepoEvent } from "@lib/firebase/firestore";
import { dayjs } from "@lib/dayjs";
import { setGoalToast, newTimezoneToast } from "@lib/react-toastify";
import { Box, Typography, Button } from "@mui/material";
import type { SxProps } from "@mui/system";
import { ProgressRing } from "components";
import { EventsPopper } from "./events-popper";

export const Today = () => {
  const userData = useUserDoc();
  const events = useCollection("events");
  const webhooks = useCollection("webhooks");

  if (!userData || !events) return null;

  // TODO: Add a TrackRepo component here
  if (!webhooks)
    return (
      <Link href="/repos" passHref>
        <Button>{`You aren't tracking any repos! Head to the repos page to add more`}</Button>
      </Link>
    );

  const [userId, { dailyGoal: goal, hasSetGoal, timezone }] = userData;

  // TODO: Test this a bunch! Can't have any timezone mishaps
  const dayEvents = getDayEvents(
    events as RepoEvent[],
    dayjs().format("YYYY-MM-DD")
  );
  const hasDayEvents = dayEvents.length > 0;

  const newTimezone = dayjs().utcOffset() !== dayjs().tz(timezone).utcOffset();
  if (newTimezone) newTimezoneToast(userId, timezone);

  // TODO: Make the name-dropped repo a link to github, and the "or other" piece a link to manage repos page
  if (!hasDayEvents) return <NoEventsHero repos={getRepos(webhooks, userId)} />;

  if (!hasSetGoal) setGoalToast();

  const progress = dayEvents.length;
  const hitGoal = progress - goal >= 0;
  const percent = hitGoal ? 100 : (progress / goal) * 100;

  return (
    <Box sx={containerSx}>
      <ProgressRing percent={percent} />
      <EventsPopper events={dayEvents} />
    </Box>
  );
};

// TODO: Test these functions a bunch – can't have any tz/date mishaps
export const getDayEvents = (events: RepoEvent[], dateString: string) => {
  const dateStringEvents = events.map((event) => [
    dayjs(event.createdAt.toDate()).format("YYYY-MM-DD"),
    event,
  ]);

  return dateStringEvents
    .filter((event) => event[0] === dateString)
    .map((event) => event[1]) as RepoEvent[];
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

const getRepos = (webhooks: any, userId: string) =>
  webhooks.map((webhook: any) => {
    const re = new RegExp(`(?<=${userId}/).*(?=/hooks)`);
    return webhook.url.match(re);
  });

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as SxProps;