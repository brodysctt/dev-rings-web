import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseApp = initializeApp(
  {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "dev-rings.firebaseapp.com",
    projectId: "dev-rings",
    storageBucket: "dev-rings.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  },
  "dev-rings-client"
);

export const analytics = () => {
  if (typeof window === "undefined") return null;
  return getAnalytics(firebaseApp);
};

export default firebaseApp;
