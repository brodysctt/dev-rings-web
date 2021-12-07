import Image from "next/image";
import { auth, githubProvider, db } from "@lib/firebase";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "@firebase/firestore";
import { Button } from "@mui/material";

export const SignInButton = () => {
  return (
    <Button
      variant="contained"
      onClick={githubSignIn}
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "8vh",
        width: "200px",
      }}
    >
      <Image src="/github.png" width="30px" height="30px" />
      Sign in with GitHub
    </Button>
  );
};

const githubSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);

    const {
      user: {
        // @ts-ignore
        reloadUserInfo: { screenName: userId },
      },
    } = result;
    console.log(`here be the user: ${userId}`);

    const credential = GithubAuthProvider.credentialFromResult(result);
    if (!credential) {
      throw new Error("the credential returned is null");
    }
    const { accessToken: token } = credential;
    console.log(token);

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
    });
  } catch (error) {
    console.error(error);
  }
};
