import { useState, useEffect } from "react";
import { useAuth } from "@lib/firebase/auth";
import { db, fetchData, CollectionName } from "@lib/firebase/firestore";
import { doc, getDoc, DocumentData } from "firebase/firestore";

export const useCollection = (name: CollectionName) => {
  const userId = useAuth();
  const [data, setData] = useState<DocumentData[] | null>(null);

  useEffect(() => {
    (async () => {
      if (userId) {
        const data = await fetchData(userId, name);
        if (!data) return;
        setData(data);
      }
    })();
  }, [userId]);

  return data;
};

export const useUserDoc = () => {
  const userId = useAuth();
  const [data, setData] = useState<[string, DocumentData] | null>(null);
  useEffect(() => {
    (async () => {
      if (userId) {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setData([userId, userDoc.data()]);
        }
      }
    })();
  }, [userId]);
  return data;
};
