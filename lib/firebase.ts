import { initializeApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  connectAuthEmulator,
} from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9TtYmaRl5deizFSPqQ0Ee_DGhccKr73o",
  authDomain: "dev-rings.firebaseapp.com",
  projectId: "dev-rings",
  storageBucket: "dev-rings.appspot.com",
  messagingSenderId: "866371552189",
  appId: "1:866371552189:web:10faf7232e18a8608048d4",
  measurementId: "G-QKF4XBD56S",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, "http://localhost:9099");
// TODO: Finesse this so it runs automatically in dev👌

export const githubProvider = new GithubAuthProvider();
githubProvider.addScope("write:repo_hook");

export const db = getFirestore(firebaseApp);
connectFirestoreEmulator(db, "localhost", 8080);
// TODO: Finesse this so it runs automatically in dev👌

export default firebaseApp;
