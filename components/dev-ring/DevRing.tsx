import { Box } from "@mui/material";
import { db } from "@lib/firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc, Timestamp } from "firebase/firestore";
import { SetGoalModal } from "./SetGoalModal";
import { Ring } from "./Ring";
import { EventsPopper } from "./events-popper";
import { DayLog } from "components";

export interface RepoEvent {
  createdAt: Timestamp;
  eventType: string;
  repo: string;
  message: string;
  url: string;
}

interface DevRingProps {
  userId: string;
  date: string;
}

export const DevRing = ({ userId, date }: DevRingProps) => {
  // TODO: Once I auto create a goal, I can delete this hook
  const [userDoc] = useDocument(doc(db, "users", userId));
  const [eventsSnapshot] = useCollection(
    collection(db, "users", userId, "events")
  );
  const [logsSnapshot] = useCollection(collection(db, "users", userId, "logs"));

  const isToday = date === "today";

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

  if (!logsSnapshot) {
    return null;
  }

  const { docs } = eventsSnapshot;
  const events = docs.map((doc) => doc.data() as RepoEvent);

  const logs = logsSnapshot.docs.map((doc: any) => [
    doc.id,
    doc.data(),
  ]) as DayLog[];
  const logInView = logs.find((log) => {
    const [dateString] = log;
    return dateString === date;
  }) as DayLog;

  const [dateString, { actual, goal }] = logInView;

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
        goal={isToday ? dailyGoal : goal}
        progress={isToday ? events.length : actual}
      />
      {Boolean(events.length) && <EventsPopper events={events} />}
    </Box>
  );
};
