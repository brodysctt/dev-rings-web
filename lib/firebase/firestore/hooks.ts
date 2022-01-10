import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuth } from "@lib/firebase/auth";
import { db } from "@lib/firebase/firestore";
import type { CollectionName, Log, RepoEvent, Webhook } from "./types";
import { collection, doc, onSnapshot, DocumentData } from "firebase/firestore";
import { toast } from "react-toastify";

export const useCollection = (name: CollectionName) => {
  const router = useRouter();
  const userId = useAuth();
  const [data, setData] = useState<DocumentData[] | null>(null);

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = onSnapshot(
      collection(db, "users", userId, name),
      (snap) => {
        if (!snap || !snap.docs.length) {
          if (name === "webhooks") {
            // TODO: Need to understand how this behaves on /repos
            router.push("/repos");
            toast.info("Track a repo to get started", {
              position: "top-center",
            });
          }
          return null;
        }
        const isLogs = name === "logs";
        const updatedData = isLogs
          ? snap.docs.map((doc) => [doc.id, doc.data()] as Log)
          : snap.docs.map((doc) => doc.data() as RepoEvent | Webhook);
        // TODO: Does setData need to be a dependency?
        setData(updatedData);
      }
    );
    return () => unsubscribe();
  }, [userId]);
  // TODO: Need to be 100000% on this dependency array

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
          }
        },
      });
      return unsub;
    }
  }, [userId]);
  return data;
};
