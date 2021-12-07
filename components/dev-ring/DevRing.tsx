import { Box } from "@mui/material";
import { useAuth, getUserId } from "@lib/firebase/auth";
import { useUserDoc, useEventsCollection } from "@lib/firebase/firestore";
import type { Timestamp } from "firebase/firestore";
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
const emptyLog = ["", { actual: 0, goal: 0 }] as Log;

export const DevRing = ({ log = emptyLog, isToday = false }: DevRingProps) => {
  const { user } = useAuth();
  if (!user) {
    return null;
  }
  const userId = getUserId(user);

  const userData = useUserDoc(userId);
  if (!userData) {
    return null;
  }

  const hasGoal = userData.hasOwnProperty("dailyGoal");
  if (!hasGoal) {
    return <SetGoalModal userId={userId} />;
  }
  const { dailyGoal } = userData;

  const events = useEventsCollection(userId);
  if (!events) {
    return null;
  }
  // TODO: Improve this
  if (!log) {
    return null;
  }
  const [x, { actual, goal }] = log;
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
