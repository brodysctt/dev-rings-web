import { useRouter } from "next/router";
import { useEffect } from "react";
import type { NextPage } from "next";
import { useUserDoc, useCollection } from "@lib/firebase/firestore";
import type { RepoEvent, Webhook } from "@lib/firebase/firestore";
import { newTzToast, setGoalToast } from "@lib/react-toastify";
import { dayjs } from "@lib/dayjs";
import { Box } from "@mui/material";
import type { SxProps } from "@mui/system";
import { KickOffHero, ProgressRing, EventsPopper } from "components";
import { calcProgress, checkTz, getDayEvents, getRepos } from "helpers";
import { toast } from "react-toastify";

const Index: NextPage = () => {
  const router = useRouter();
  const userData = useUserDoc();
  const events = useCollection("events") as RepoEvent[] | null;
  const webhooks = useCollection("webhooks") as Webhook[] | null;

  useEffect(() => {
    if (!webhooks) {
      router.push("/repos");
      toast.info("Track a repo to get started", {
        position: "top-center",
      });
    }
  }, []);

  if (!userData || !webhooks) return null;
  const [userId, { dailyGoal: goal, hasSetGoal, timezone }] = userData;

  // TODO: Write unit tests for this
  const dayEvents = getDayEvents(
    events as RepoEvent[],
    dayjs().format("YYYY-MM-DD")
  );

  const isNewTz = checkTz(timezone);
  if (isNewTz) newTzToast(userId, timezone);
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
  height: "70vh",
  width: "100%",
} as SxProps;

const devRingSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as SxProps;
