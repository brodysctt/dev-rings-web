import { useAuth } from "@lib/hooks";
import { Box } from "@mui/material";
import { db } from "@lib/firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc, Timestamp } from "firebase/firestore";
import { SetGoalModal } from "./SetGoalModal";
import { Ring } from "./Ring";
import { EventsPopper } from "./events-popper";
import { Log } from "components";

export interface RepoEvent {
  createdAt: Timestamp;
  eventType: string;
  repo: string;
  message: string;
  url: string;
}

interface DevRingProps {
  log: Log; // TODO: How do I type this to be conditional? I.e., if isToday is omitted, log is required
  isToday?: boolean;
}

// TODO: Can delete once I resolve comment above
const logPlaceholder = ["", { actual: 0, goal: 0 }] as Log;

export const DevRing = ({
  log = logPlaceholder,
  isToday = false,
}: DevRingProps) => {
  const { user } = useAuth();

  const {
    // @ts-ignore
    reloadUserInfo: { screenName: userId },
  } = user;

  if (!userId) {
    return null;
  }
  // TODO: Refactor so that I don't need to hit firestore again? 🤷‍♂️
  const [userDoc] = useDocument(doc(db, "users", userId));
  const [eventsSnapshot] = useCollection(
    collection(db, "users", userId, "events")
  );

  if (!userDoc) {
    console.log("no user doc bruh");
    return null;
  }
  const userData = userDoc.data();
  if (!userData) {
    console.log("no user data bruh");
    return null;
  }
  const hasGoal = userData.hasOwnProperty("dailyGoal");
  if (!hasGoal) {
    return <SetGoalModal userId={userId} />;
  }
  const { dailyGoal } = userData;

  // TODO: Properly handle this – log to Sentry
  if (!eventsSnapshot) {
    return null;
  }
  const { docs } = eventsSnapshot;
  const events = docs.map((doc) => doc.data() as RepoEvent);

  // TODO: Improve this
  if (!log) {
    return null;
  }
  const [datestring, { actual, goal }] = log;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ring
        progress={isToday ? events.length : actual}
        goal={isToday ? dailyGoal : goal}
      />
      {Boolean(events.length) && <EventsPopper events={events} />}
    </Box>
  );
};
