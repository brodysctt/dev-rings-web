import { Typography } from "@mui/material";
import { db } from "@lib/firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc } from "firebase/firestore";
import { DevRing, PushEvent } from "./DevRing";
import { SetGoalModal } from "./SetGoalModal";

export const FirestoreDevRing = ({ userId }: { userId: string }) => {
  const [userDoc] = useDocument(doc(db, "users", userId));
  const [eventsSnapshot] = useCollection(
    collection(db, "users", userId, "events")
  );

  if (!userDoc) {
    console.log("no user doc bruh");
    console.dir(userDoc);
    return <Typography>Hmmm, this is unexpected 😟</Typography>;
  }
  const userData = userDoc.data();
  if (!userData) {
    console.log("no user data bruh");
    console.dir(userData);
    return <Typography>Hmmm, this is unexpected 😟</Typography>;
  }
  const hasGoal = userData.hasOwnProperty("dailyGoal");
  if (!hasGoal) {
    return <SetGoalModal userId={userId} />;
  }
  const { dailyGoal } = userData;

  if (!eventsSnapshot) {
    return <Typography>Hmmm, this is unexpected 😟</Typography>;
  }
  const { docs } = eventsSnapshot;
  const events = docs.map((doc) => doc.data() as PushEvent);

  return <DevRing goal={dailyGoal} events={events} />;
};
