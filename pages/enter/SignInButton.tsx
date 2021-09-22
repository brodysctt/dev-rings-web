import Image from "next/image";
import { auth, githubProvider } from "@lib/firebase";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";

export const SignInButton = () => (
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

const githubSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);

    const credential = GithubAuthProvider.credentialFromResult(result);
    if (!credential) {
      throw new Error("the credential returned is null");
    }
    const { accessToken } = credential;
    console.log(JSON.stringify(accessToken));
    // TODO: store token in state
    const { user } = result;
    console.log(JSON.stringify(user));
    // TODO: store user in state
  } catch (error) {
    console.error(error);
  }
};
