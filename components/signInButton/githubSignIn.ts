import { auth, githubProvider, db } from "lib/firebase";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { doc, setDoc } from "@firebase/firestore";

export const githubSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);

    const {
      user: { email },
    } = result;
    console.log(email);

    const credential = GithubAuthProvider.credentialFromResult(result);
    if (!credential) {
      throw new Error("the credential returned is null");
    }
    const { accessToken: token } = credential;
    console.log(token);

    if (!email) {
      throw new Error("the email returned is null");
    }

    await setDoc(doc(db, "users", email), {
      email,
      token,
    });
  } catch (error) {
    console.error(error);
  }
};
