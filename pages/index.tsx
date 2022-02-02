import type { NextPage } from "next";
import Stack from "@mui/material/Stack";
import { DevRing, GetStarted } from "components";
import { NewTimezoneAlert } from "@lib/react-toastify";
import { useUserDoc, useCollection } from "@lib/firebase/firestore";
import type { RepoEvent, Webhook } from "@lib/firebase/firestore";
import { dayjs, getDayEvents } from "@lib/dayjs";

const Index: NextPage = () => {
  const userData = useUserDoc();
  const events = useCollection("events") as RepoEvent[] | null;
  const webhooks = useCollection("webhooks") as Webhook[] | null;

  if (!userData || !webhooks) return null;
  const { dailyGoals, timezone } = userData;

  const dayEvents = getDayEvents(
    events as RepoEvent[],
    dayjs().format("YYYY-MM-DD")
  );

  if (!dayEvents)
    return (
      <Stack justifyContent="center" alignItems="center" height="80vh">
        <GetStarted />
        <NewTimezoneAlert tz={timezone} />
      </Stack>
    );

  const commitsActual = dayEvents.filter(
    ({ eventType }) => eventType === "push"
  ).length;
  const prsActual = dayEvents.filter(
    ({ eventType }) => eventType === "pull_request"
  ).length;

  return (
    <Stack direction="row" justifyContent="center">
      <DevRing
        events={dayEvents}
        values={[
          [commitsActual, dailyGoals.commits],
          [prsActual, dailyGoals.prs],
        ]}
      />
      <NewTimezoneAlert tz={timezone} />
    </Stack>
  );
};

export default Index;
