import { useState, useEffect } from "react";
import { useAuth } from "@lib/firebase/auth";
import { db } from "@lib/firebase/firestore";
import type { CollectionName, Log, RepoEvent, Webhook } from "./types";
import { collection, doc, onSnapshot, DocumentData } from "firebase/firestore";

export const useCollection = (name: CollectionName) => {
  const userId = useAuth();
  const [data, setData] = useState<DocumentData[] | null>(null);
  const isLogs = name === "logs";

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = onSnapshot(
      collection(db, "users", userId, name),
      (snap) => {
        if (!snap || !snap.docs.length) return null;
        const updatedData = isLogs
          ? snap.docs.map((doc) => [doc.id, doc.data()] as Log)
          : snap.docs.map((doc) => doc.data() as RepoEvent | Webhook);
        setData(updatedData);
      }
    );
    return () => unsubscribe();
  }, [userId]);
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
