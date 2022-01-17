import type { NextPage } from "next";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  CommitSvg,
  EventsTimeline,
  GetStarted,
  PopIt,
  ProgressRing,
} from "components";
import { NewTimezoneAlert } from "@lib/react-toastify";
import { getRepos, useUserDoc, useCollection } from "@lib/firebase/firestore";
import type { RepoEvent, Webhook } from "@lib/firebase/firestore";
import { dayjs, getDayEvents } from "@lib/dayjs";

const Index: NextPage = () => {
  const userData = useUserDoc();
  const events = useCollection("events") as RepoEvent[] | null;
  const webhooks = useCollection("webhooks") as Webhook[] | null;

  if (!userData || !webhooks) return null;
  const [userId, { dailyGoal: goal, timezone }] = userData;

  const dayEvents = getDayEvents(
    events as RepoEvent[],
    dayjs().format("YYYY-MM-DD")
  );

  if (!dayEvents)
    return (
      <Stack justifyContent="center" alignItems="center" height="80vh">
        <GetStarted repos={getRepos(webhooks, userId)} />
        <NewTimezoneAlert tz={timezone} />
      </Stack>
    );

  const actual = dayEvents.length;
  return (
    <Stack justifyContent="center" alignItems="center" height="80vh">
      <Stack alignItems="center">
        <Typography color="text.secondary" sx={{ mb: 6 }}>
          {dayjs().format("LL")}
        </Typography>
        <ProgressRing values={[actual, goal]} />
        <PopIt
          id="View events"
          icon={
            <Stack px={0.8} py={2} height={25} sx={iconSx}>
              <CommitSvg />
            </Stack>
          }
          sx={{ mt: 4 }}
        >
          <EventsTimeline events={dayEvents} />
        </PopIt>
      </Stack>
      <NewTimezoneAlert tz={timezone} />
    </Stack>
  );
};

const iconSx = {
  justifyContent: "center",
  bgcolor: "primary.main",
  borderRadius: 50,
  px: 0.8,
  py: 2,
};

export default Index;
