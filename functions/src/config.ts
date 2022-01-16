import * as admin from "firebase-admin";
import cors from "cors";

admin.initializeApp();
export const db = admin.firestore();

export const corsHandler = cors({
  origin: "/dev-rings-web.*bscott4.vercel.app/",
});
