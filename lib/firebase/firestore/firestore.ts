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
import type { CollectionName, Log, RepoEvent, Webhook } from "./types";

export const db = getFirestore(firebaseApp);

export const fetchData = async (userId: string, name: CollectionName) => {
  const snap = await getDocs(collection(db, "users", userId, name));
  if (!snap || !snap.docs.length) return null;
  if (name === "logs")
    return snap.docs.map((doc) => [doc.id, doc.data()] as Log);
  return snap.docs.map((doc) => doc.data() as RepoEvent | Webhook);
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
