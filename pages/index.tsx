import Link from "next/link";
import type { NextPage } from "next";
import { useUserDoc, useCollection } from "@lib/firebase/firestore";
import type { RepoEvent, Webhook } from "@lib/firebase/firestore";
import { newTzToast, setGoalToast } from "@lib/react-toastify";
import { dayjs } from "@lib/dayjs";
import { Box, Button } from "@mui/material";
import type { SxProps } from "@mui/system";
import { KickOffHero, ProgressRing, EventsPopper } from "components";
import { calcProgress, checkTz, getDayEvents, getRepos } from "helpers";

const Index: NextPage = () => {
  const userData = useUserDoc();
  const events = useCollection("events") as RepoEvent[] | null;
  const webhooks = useCollection("webhooks") as Webhook[] | null;

  // TODO: Add a TrackRepo component here
  if (!webhooks)
    return (
      <Link href="/repos" passHref>
        <Button>{`You aren't tracking any repos! Head to the repos page to add more`}</Button>
      </Link>
    );

  if (!userData) return null;
  const [userId, { dailyGoal: goal, hasSetGoal, timezone }] = userData;

  // TODO: Write unit tests for this
  const dayEvents = getDayEvents(
    events as RepoEvent[],
    dayjs().format("YYYY-MM-DD")
  );

  const isNewTz = checkTz(timezone);
  if (isNewTz) newTzToast(userId, timezone);
  // TODO: Make the name-dropped repo a link to github, and the "or other" piece a link to manage repos page
  if (!dayEvents) return <KickOffHero repos={getRepos(webhooks, userId)} />;
  if (!hasSetGoal) setGoalToast();

  const actual = dayEvents.length;
  return (
    <Box sx={containerSx}>
      <Box sx={devRingSx}>
        <ProgressRing percent={calcProgress(actual, goal)} />
        <EventsPopper events={dayEvents} />
      </Box>
    </Box>
  );
};

export default Index;

const containerSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
  width: "100%",
} as SxProps;

const devRingSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as SxProps;
