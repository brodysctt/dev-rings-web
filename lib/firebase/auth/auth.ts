import firebaseApp from "@lib/firebase/app";
import { setGitHubAvatar, setGitHubToken } from "@lib/firebase/firestore";
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";

export const auth = getAuth(firebaseApp);

const githubProvider = new GithubAuthProvider();
// githubProvider.addScope("write:repo_hook");
githubProvider.addScope("admin:repo_hook");

export const githubSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const { user } = result;
    const userId = await getUserId(user);

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

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch {
    console.error("There was an error signing out");
  }
};

export const getUserId = (user: User) => {
  console.log("here be the user");
  console.dir(user);
  const {
    // @ts-ignore
    reloadUserInfo: { screenName: userId, photoUrl: githubAvatarUrl },
  } = user;
  (async () => await setGitHubAvatar(userId, githubAvatarUrl))();
  return userId;
};
