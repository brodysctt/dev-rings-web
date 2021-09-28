import Image from "next/image";

import { auth, githubProvider, db } from "@lib/firebase";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { collection, addDoc } from "@firebase/firestore";

export const SignInButton = () => {
  return (
    <button
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
    </button>
  );
};

const githubSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);

    const credential = GithubAuthProvider.credentialFromResult(result);
    if (!credential) {
      throw new Error("the credential returned is null");
    }
    const { accessToken: token } = credential;
    console.log(JSON.stringify(token));
    const docRef = await addDoc(collection(db, "users"), {
      token: token,
    });
    console.log("Document written with ID: ", docRef.id);
    // TODO: Fetch public repos and store them in state
  } catch (error) {
    console.error(error);
  }
};
