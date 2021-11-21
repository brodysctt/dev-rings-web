import { auth } from "@lib/firebase";
import { signOut } from "firebase/auth";

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch {
    console.error("There was an error signing out");
  }
};
