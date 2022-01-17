import type { NextPage } from "next";
import { getRepos, useUserDoc, useCollection } from "@lib/firebase/firestore";
import type { RepoEvent, Webhook } from "@lib/firebase/firestore";
import { dayjs, getDayEvents } from "@lib/dayjs";
import { Box, Typography } from "@mui/material";
import type { SxProps } from "@mui/system";
import {
  CommitSvg,
  EventsTimeline,
  GetStarted,
  PopIt,
  ProgressRing,
} from "components";
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
        <Typography color="text.secondary" sx={{ mb: 6 }}>
          {dayjs().format("LL")}
        </Typography>
        <ProgressRing values={[actual, goal]} />
        <PopIt id="View events" icon={<CommitSvg />} sx={{ mt: 4 }}>
          <EventsTimeline events={dayEvents} />
        </PopIt>
      </Box>
      <NewTimezoneAlert tz={timezone} />
    </Box>
  );
};

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

export default Index;
