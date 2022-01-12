import type { NextPage } from "next";
import { useUserDoc, useCollection } from "@lib/firebase/firestore";
import type { RepoEvent, Webhook } from "@lib/firebase/firestore";
import { newTzToast } from "@lib/react-toastify";
import { dayjs, checkTimezone, getDayEvents } from "@lib/dayjs";
import { Box } from "@mui/material";
import type { SxProps } from "@mui/system";
import { GetStarted, ProgressRing, EventsPopper } from "components";
import { calcProgress, getRepos } from "helpers";

const Index: NextPage = () => {
  const userData = useUserDoc();
  const events = useCollection("events") as RepoEvent[] | null;
  const webhooks = useCollection("webhooks") as Webhook[] | null;

  if (!userData || !webhooks) return null;
  const [userId, { dailyGoal: goal, timezone }] = userData;

  // TODO: Write unit tests for this
  const dayEvents = getDayEvents(
    events as RepoEvent[],
    dayjs().format("YYYY-MM-DD")
  );

  const isNewTz = checkTimezone(timezone);
  if (isNewTz) newTzToast(userId, timezone);
  if (!dayEvents) return <GetStarted repos={getRepos(webhooks, userId)} />;

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

const containerSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "70vh",
  width: "100%",
} as SxProps;

const devRingSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as SxProps;

export default Index;
