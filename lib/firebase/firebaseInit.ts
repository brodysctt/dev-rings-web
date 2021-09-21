import firebaseConfig from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  connectAuthEmulator,
} from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, "http://localhost:9099");
// TODO: Finesse this so it runs automatically in dev👌

export const githubProvider = new GithubAuthProvider();
githubProvider.addScope("write:repo_hook");

// export const firestore = getFirestore(firebaseApp);

export default firebaseApp;
