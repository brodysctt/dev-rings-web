import { db } from "@lib/firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc, Timestamp } from "firebase/firestore";
import { SetGoalModal } from "./SetGoalModal";
import { Ring } from "./Ring";

export interface PushEvent {
  createdAt: Timestamp;
  eventType: string;
  repo: string;
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

  if (!eventsSnapshot) {
    return null;
  }
  const { docs } = eventsSnapshot;
  const events = docs.map((doc) => doc.data() as PushEvent);
  const progress = events.length;
  return <Ring goal={dailyGoal} progress={progress} />;
};
