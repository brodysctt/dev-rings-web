import type { NextPage } from "next";
import { getRepos, useUserDoc, useCollection } from "@lib/firebase/firestore";
import type { RepoEvent, Webhook } from "@lib/firebase/firestore";
import { dayjs, getDayEvents } from "@lib/dayjs";
import { Box } from "@mui/material";
import type { SxProps } from "@mui/system";
import { GetStarted, ProgressRing, EventsPopper } from "components";
import { NewTimezoneAlert } from "@lib/react-toastify";

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

  if (!dayEvents)
    return (
      <Box sx={containerSx}>
        <GetStarted repos={getRepos(webhooks, userId)} />
        <NewTimezoneAlert tz={timezone} />
      </Box>
    );

  const actual = dayEvents.length;
  return (
    <Box sx={containerSx}>
      <Box sx={devRingSx}>
        <ProgressRing values={[actual, goal]} />
        <EventsPopper events={dayEvents} />
      </Box>
      <NewTimezoneAlert tz={timezone} />
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
