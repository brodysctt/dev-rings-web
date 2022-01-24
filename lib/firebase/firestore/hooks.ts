import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@lib/firebase/auth";
import { db } from "@lib/firebase/firestore";
import type { CollectionName, Log, RepoEvent, Webhook } from "./types";
import { collection, doc, onSnapshot, DocumentData } from "firebase/firestore";

export const useCollection = (name: CollectionName) => {
  const router = useRouter();
  const userId = useAuth();
  const userData = useUserDoc();
  const [data, setData] = useState<DocumentData[] | null>(null);
  const isEvents = name === "events";

  useEffect(() => {
    if (!userId || !userData) return;
    const [, { isOnboarding }] = userData;
    const unsubscribe = onSnapshot(
      collection(db, "users", userId, name),
      (snap) => {
        const noData = !snap || !snap.docs.length;
        if (noData) {
          if (!isOnboarding && name === "webhooks") router.push("/repos");
          return null;
        }
        const updatedData = isEvents
          ? snap.docs.map((doc) => doc.data() as RepoEvent)
          : snap.docs.map((doc) => [doc.id, doc.data()] as Log | Webhook);
        setData(updatedData);
      }
    );
    return () => unsubscribe();
  }, [userId, userData]);
  // TODO: Need to be 100% on this dependency array. setData? isLogs? Explain the whys
  return data;
};

export const useUserDoc = () => {
  const userId = useAuth();
  const [data, setData] = useState<[string, DocumentData] | null>(null);
  useEffect(() => {
    if (userId) {
      const unsub = onSnapshot(doc(db, "users", userId), {
        next: (userDoc) => {
          if (userDoc.exists()) {
            setData([userId, userDoc.data()]);
            return;
          }
        },
      });
      return unsub;
    }
  }, [userId]);
  return data;
};
