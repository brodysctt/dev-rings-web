import Link from "next/link";
import Image from "next/image";
import { Box, Typography, Button } from "@mui/material";
import type { SxProps } from "@mui/system";
import {
  useUserDoc,
  useEventsCollection,
  useWebhooksCollection,
} from "@lib/firebase/firestore";
import { Ring } from "./Ring";
import { getDayEvents, createDateString } from "./utils";
import { EventsPopper } from "./events-popper";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TodayDevRing = ({ userId }: { userId: string }) => {
  const userData = useUserDoc(userId);
  const events = useEventsCollection(userId);
  const repos = useWebhooksCollection(userId);

  if (!userData || !events) return null;

  // TODO: Add a TrackRepo component here
  if (!repos)
    return (
      <Link href="/repos" passHref>
        <Button>{`You aren't tracking any repos! Head to the repos page to add more`}</Button>
      </Link>
    );

  const { dailyGoal, hasSetGoal } = userData;

  // TODO: Test this a bunch! Can't have any timezone mishaps
  const dateString = createDateString();
  const dayEvents = getDayEvents(events, dateString);
  const hasDayEvents = dayEvents.length > 0;

  // TODO: Make the name-dropped repo a link to github, and the "or other" piece a link to manage repos page
  if (!hasDayEvents) return <NoEventsHero repos={repos} />;

  // TODO: Think thru responsiveness here
  if (!hasSetGoal) fireGoalToast();

  return (
    <Box sx={containerSx}>
      <Ring progress={dayEvents.length} goal={dailyGoal} />
      <EventsPopper events={dayEvents} />
      <ToastContainer />
    </Box>
  );
};

const NoEventsHero = ({ repos }: { repos: any[] }) => (
  <Box sx={containerSx}>
    <Typography variant="h6" sx={{ mb: 5, color: "primary.main" }}>
      {`Push changes to ✨${repos[0]} ✨ ${
        repos.length > 1
          ? `(or any of the ${repos.length - 1} other repos you're tracking)`
          : ""
      } to kick off today's progress 🚀`}
    </Typography>
    <Image
      src="https://media.giphy.com/media/Yx5ns1mSPBle0/giphy.gif"
      alt=""
      height={250}
      width={400}
    />
  </Box>
);

const fireGoalToast = () =>
  toast(
    <Box sx={containerSx}>
      <Typography
        align="center"
        color="primary.main"
        sx={{ whiteSpace: "pre-wrap" }}
      >
        {`Woo! Congrats on tracking your first commit 🎉
Now click the 🏆 to update your daily goal`}
      </Typography>
    </Box>,
    {
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      style: {
        width: 390,
      },
    }
  );

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as SxProps;
