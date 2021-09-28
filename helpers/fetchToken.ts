import { db } from "@lib/firebase";
import { doc, getDoc } from "@firebase/firestore";

export const fetchToken = async () => {
  // TODO: Update to be dynamic
  const docRef = doc(db, "users", "0bl9ZeYe9fd0HeHWrjc1");
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
