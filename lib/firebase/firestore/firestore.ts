import firebaseApp from "@lib/firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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

export const fetchHookId = async (userId: string, repo: string) => {
  const docRef = doc(db, "users", userId, "webhooks", repo);
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

  const { hookId } = data;
  return hookId;
};

export const setAvatar = async (userId: string, avatarId: string) => {
  await updateDoc(doc(db, "users", userId), {
    avatarId,
  });
  // TODO: Only show if not onboarding
  // toast.success(`Avatar successfully updated ${avatarId}`);
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
    isOnboarding: true,
  });
  toast.success("Successfully created account 🎉");
};

export const setGoal = async (userId: string, goal: number, type: string) => {
  const isCommits = type === "commits";
  if (!isCommits) {
    await updateDoc(doc(db, "users", userId), {
      "dailyGoals.prs": goal,
    });
    // TODO: Only show if not onboarding
    // toast.success(`Daily PRs goal is now ${goal} 🏔️`);
    return;
  }

  await updateDoc(doc(db, "users", userId), {
    "dailyGoals.commits": goal,
  });
  toast.success(`Daily commits goal is now ${goal} 🏔️`);
};

export const setIsOnboarding = async (userId: string) => {
  await updateDoc(doc(db, "users", userId), {
    isOnboarding: false,
  });
  toast.success("Onboarding complete");
};

export const setTimezone = async (userId: string, timezone: string) => {
  await updateDoc(doc(db, "users", userId), {
    timezone,
  });
  toast.success("Successfully updated timezone");
};
