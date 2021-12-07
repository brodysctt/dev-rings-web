import { auth, githubProvider, getUserId, setGitHubToken } from "@lib/firebase";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";

export const githubSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const { user } = result;
    const userId = getUserId(user);

    const credential = GithubAuthProvider.credentialFromResult(result);
    if (!credential) {
      throw new Error("the credential returned is null");
    }
    const { accessToken: githubToken } = credential;
    if (!githubToken) {
      return;
    }
    await setGitHubToken(userId, githubToken);
  } catch (error) {
    console.error(error);
  }
};
