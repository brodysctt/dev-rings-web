import type { NextPage } from "next";
import Stack from "@mui/material/Stack";
import { DevRing, GetStarted } from "components";
import { NewTimezoneAlert } from "@lib/react-toastify";
import { getRepos, useUserDoc, useCollection } from "@lib/firebase/firestore";
import type { RepoEvent, Webhook } from "@lib/firebase/firestore";
import { dayjs, getDayEvents } from "@lib/dayjs";

const Index: NextPage = () => {
  const userData = useUserDoc();
  const events = useCollection("events") as RepoEvent[] | null;
  const webhooks = useCollection("webhooks") as Webhook[] | null;

  if (!userData || !webhooks) return null;
  const [, { dailyGoal: goal, timezone }] = userData;

  const dayEvents = getDayEvents(
    events as RepoEvent[],
    dayjs().format("YYYY-MM-DD")
  );

  // TODO: Change back to !dayEvents
  if (dayEvents)
    return (
      <Stack justifyContent="center" alignItems="center" height="80vh">
        <GetStarted />
        <NewTimezoneAlert tz={timezone} />
      </Stack>
    );

  const actual = dayEvents.length;
  return (
    <>
      <DevRing events={dayEvents} values={[actual, goal]} />
      <NewTimezoneAlert tz={timezone} />
    </>
  );
};

export default Index;
