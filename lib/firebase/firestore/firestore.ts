import firebaseApp from "@lib/firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { dayjs } from "@lib/dayjs";
import { toast } from "react-toastify";
import { setTimezoneToast } from "@lib/react-toastify";

export const db = getFirestore(firebaseApp);

export type CollectionName = "events" | "logs" | "webhooks";

interface FetchData {
  userId: string;
  name: CollectionName;
  options?: {
    prependDocId: boolean;
  };
}

export const fetchData = async ({
  userId,
  name,
  options = { prependDocId: false },
}: FetchData) => {
  const snapshot = await getDocs(collection(db, "users", userId, name));
  if (!snapshot || !snapshot.docs.length) return null;
  if (options.prependDocId)
    return snapshot.docs.map((doc) => [doc.id, doc.data()]);
  return snapshot.docs.map((doc) => doc.data());
};

export const fetchGitHubToken = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (!docSnap) {
    console.log("No such document exists bruh");
    return;
  }

  const data = docSnap.data();

  if (!data) {
    console.log("Document exists, but data be undefined bruh");
    return;
  }

  const { token } = data;
  console.log(`here lies the token: ${token}`);
  return token;
};

export const setGitHubToken = async (userId: string, token: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, {
      token,
    });
    return;
  }
  await setDoc(docRef, {
    token,
    goal: 1,
    hasSetGoal: false,
    timezone: dayjs.tz.guess(),
  });
  toast.success("Successfully created account 🎉");
  setTimezoneToast();
};

export const updateDailyGoal = async (userId: string, dailyGoal: number) => {
  console.log("Submitting goal...");
  await updateDoc(doc(db, "users", userId), {
    dailyGoal,
    hasSetGoal: true,
  });
  console.log("Sucessfully submitted goal 🎉");
};

export const updateTimezone = async (userId: string, timezone: string) => {
  await updateDoc(doc(db, "users", userId), {
    timezone,
  });
  toast.success("Successfully updated timezone");
};
