import Image from "next/image";
import type { NextPage } from "next";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Avatar, DevRing } from "components";
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
        <Stack alignItems="center">
          <Stack direction="row">
            <Typography align="center" variant="h6" color="primary" mr={1}>
              {`Push a commit to kick off today's progress`}
            </Typography>
            <Stack>
              <Image src="/blobhighfive.png" width={30} height={30} />
            </Stack>
          </Stack>
          <Avatar />
        </Stack>
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
