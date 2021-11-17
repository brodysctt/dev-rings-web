import { Box, Typography } from "@mui/material";
import { db } from "@lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { DevRing } from "./DevRing";

export const FirestoreDevRing = ({ userId }: { userId: string }) => {
  const eventsRef = collection(db, "users", userId, "events");
  const [snapshot, loading, error] = useCollection(eventsRef);

  if (loading) {
    return (
      <Box>
        <Typography>Fetching data...</Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box>
        <Typography>Error: {error}</Typography>
      </Box>
    );
  }
  if (snapshot) {
    const { docs: events } = snapshot;
    console.log(`here be the # of events: ${events.length}`);
    return <DevRing events={events} />;
  }
  return null;
};
