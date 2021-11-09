import { auth } from "@lib/firebase";
import { signOut } from "firebase/auth";

export const SignOutButton = () => {
  return (
    <button
      onClick={() => signOutUser()}
      style={{
        height: "8vh",
        width: "200px",
      }}
    >
      Sign Out
    </button>
  );
};

const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch {
    console.error("There was an error signing out");
  }
};
