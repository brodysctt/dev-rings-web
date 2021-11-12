import Image from "next/image";
import { auth, githubProvider, db } from "lib/firebase";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { doc, setDoc } from "@firebase/firestore";

export const SignInButton = () => {
  return (
    <button
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
    </button>
  );
};

const githubSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);

    const {
      user: {
        // @ts-ignore
        reloadUserInfo: { screenName: githubUser },
      },
    } = result;

    console.log(`here be the user: ${githubUser}`);

    const credential = GithubAuthProvider.credentialFromResult(result);
    if (!credential) {
      throw new Error("the credential returned is null");
    }
    const { accessToken: token } = credential;
    console.log(token);

    await setDoc(doc(db, "users", githubUser), {
      githubUser,
      token,
    });
  } catch (error) {
    console.error(error);
  }
};
