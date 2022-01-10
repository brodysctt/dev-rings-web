import firebaseApp from "@lib/firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { dayjs } from "@lib/dayjs";
import { toast } from "react-toastify";

export const db = getFirestore(firebaseApp);

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
    dailyGoal: 1,
    isOnboarding: true,
    timezone: dayjs.tz.guess(),
  });
  toast.success("Successfully created account 🎉", {
    position: "top-center",
  });
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
