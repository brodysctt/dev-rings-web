import Image from "next/image";
import { auth, githubProvider, db } from "lib/firebase";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { Button } from "@mui/material";

export const SignInButton = () => {
  return (
    <Button
      onClick={() => githubSignIn()}
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

    await setDoc(doc(db, "users", userId), {
      token,
    });
  } catch (error) {
    console.error(error);
  }
};
