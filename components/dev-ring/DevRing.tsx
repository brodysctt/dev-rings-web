import { Box } from "@mui/material";
import { db } from "@lib/firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc, Timestamp } from "firebase/firestore";
import { SetGoalModal } from "./SetGoalModal";
import { Ring } from "./Ring";
import { EventsPopper } from "./events-popper";

export interface RepoEvent {
  createdAt: Timestamp;
  eventType: string;
  repo: string;
  message: string;
  url: string;
}

export const DevRing = ({ userId }: { userId: string }) => {
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
  const progress = events.length;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ring goal={dailyGoal} progress={progress} />
      {Boolean(progress) && <EventsPopper events={events} />}
    </Box>
  );
};
