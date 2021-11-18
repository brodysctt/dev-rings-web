import { auth } from "@lib/firebase";
import { signOut } from "firebase/auth";
import { Button } from "@mui/material";

export const SignOutButton = () => {
  return (
    <Button
      onClick={signOutUser}
      sx={{
        mr: "20px",
      }}
    >
      Sign Out
    </Button>
  );
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch {
    console.error("There was an error signing out");
  }
};
