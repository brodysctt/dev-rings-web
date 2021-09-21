import { auth, githubProvider } from "./firebaseInit";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";

export const githubSignIn = async () => {
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

// export sign out as well
