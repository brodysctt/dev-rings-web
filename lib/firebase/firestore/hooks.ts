import { db } from "@lib/firebase";
import { doc, collection, QuerySnapshot } from "firebase/firestore";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";

export const useUserDoc = (userId: string) => {
  const [userDoc] = useDocument(doc(db, "users", userId));
  // TODO: Toss an error? This would be a critical bug
  if (!userDoc || !userDoc.exists) return null;
  return userDoc.data();
};

export const useCollections = (userId: string) => {
  const { eventsRef, logsRef, webhooksRef } = createRefs(userId);
  const [eventsSnap] = useCollection(eventsRef);
  const [logsSnap] = useCollection(logsRef);
  const [webhooksSnap] = useCollection(webhooksRef);

  const snaps = [eventsSnap, logsSnap, webhooksSnap];
  return getDataFromSnaps(snaps);
};

const createRefs = (userId: string) => {
  return {
    eventsRef: collection(db, "users", userId, "events"),
    logsRef: collection(db, "users", userId, "logs"),
    webhooksRef: collection(db, "users", userId, "webhooks"),
  };
};

const getDataFromSnaps = (snaps: Array<QuerySnapshot | undefined>) =>
  snaps.map((snap) => {
    if (!snap || !snap.docs.length) return null;
    return snap.docs.map((doc) => doc.data());
  });
