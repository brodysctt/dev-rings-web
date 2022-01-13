import { useEffect } from "react";
import type { NextPage } from "next";
import { getRepos, useUserDoc, useCollection } from "@lib/firebase/firestore";
import type { RepoEvent, Webhook } from "@lib/firebase/firestore";
import { newTimezoneToast } from "@lib/react-toastify";
import { dayjs, compareTimezones, getDayEvents } from "@lib/dayjs";
import { Box } from "@mui/material";
import type { SxProps } from "@mui/system";
import { GetStarted, ProgressRing, EventsPopper } from "components";

const Index: NextPage = () => {
  const userData = useUserDoc();
  const events = useCollection("events") as RepoEvent[] | null;
  const webhooks = useCollection("webhooks") as Webhook[] | null;

  // TODO: Consider writing a custom hook and firing this in _app.tsx
  useEffect(() => {
    if (!userData) return;
    const [userId, { timezone: tz }] = userData;
    const isNewTimezone = compareTimezones(tz);
    if (isNewTimezone) newTimezoneToast(userId, tz);
  }, [userData]);

  if (!userData || !webhooks) return null;
  const [userId, { dailyGoal: goal }] = userData;

  // TODO: Write unit tests for this
  const dayEvents = getDayEvents(
    events as RepoEvent[],
    dayjs().format("YYYY-MM-DD")
  );

  if (!dayEvents)
    return (
      <Box sx={containerSx}>
        <GetStarted repos={getRepos(webhooks, userId)} />
      </Box>
    );

  const actual = dayEvents.length;
  return (
    <Box sx={containerSx}>
      <Box sx={devRingSx}>
        <ProgressRing values={[actual, goal]} />
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
