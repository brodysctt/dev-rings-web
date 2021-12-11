import { db } from "@lib/firebase";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import { doc, collection } from "firebase/firestore";
import type { Log, RepoEvent } from "components";

// TODO: Double check return types of useDocument and useCollection hooks
// I know these hooks ☝️ update automatically, will mine inherit this functionality?
// How do I want to handle the "if !result return null" cases? Do I want to log to Sentry?
// This also relates to every component where I'm using them – will be able to refactor there as well
// Actually, should probably use the error state from react-firebase-hooks and then use Sentry
export const useUserDoc = (userId: string) => {
  const [userDoc] = useDocument(doc(db, "users", userId));
  if (!userDoc || !userDoc.exists) return null;
  return userDoc.data();
};

// Create hook that snags events for that given day
// Would need to add a dateString property to these events to accomplish this

export const useEventsCollection = (userId: string) => {
  const [eventsSnapshot] = useCollection(
    collection(db, "users", userId, "events")
  );
  if (!eventsSnapshot) return null;
  const { docs } = eventsSnapshot;
  const events = docs.map((doc) => doc.data() as RepoEvent);
  return events;
};

export const useLogsCollection = (userId: string): Log[] | null => {
  const [logsSnapshot] = useCollection(collection(db, "users", userId, "logs"));
  if (!logsSnapshot) return null;
  return logsSnapshot.docs.map((doc: any) => [doc.id, doc.data()]) as Log[];
};

export const useWebhooksCollection = (userId: string) => {
  const webhooksRef = collection(db, "users", userId, "webhooks");
  const [webhooksSnapshot] = useCollection(webhooksRef);
  if (!webhooksSnapshot || !webhooksSnapshot.docs.length) return null;
  return webhooksSnapshot.docs.map((doc) => {
    const { url } = doc.data();
    const repoSubstring = new RegExp(`(?<=${userId}/).*(?=/hooks)`);
    return url.match(repoSubstring);
  });
};
