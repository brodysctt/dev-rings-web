import { getAuth, GithubAuthProvider } from "firebase/auth";
import firebaseApp from "@lib/firebase/app";

export const auth = getAuth(firebaseApp);

export const githubProvider = new GithubAuthProvider();
githubProvider.addScope("write:repo_hook");
