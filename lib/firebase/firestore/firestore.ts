import firebaseApp from "@lib/firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const db = getFirestore(firebaseApp);

export const setGitHubToken = async (userId: string, token: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, {
      token,
    });
    return;
  }
  // if doc doesn't exist, create a user
  await setDoc(docRef, {
    token,
  });
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

export const updateDailyGoal = async (userId: string, dailyGoal: number) => {
  console.log("Submitting goal...");
  await updateDoc(doc(db, "users", userId), {
    dailyGoal,
  });
  console.log("Sucessfully submitted goal 🎉");
};
