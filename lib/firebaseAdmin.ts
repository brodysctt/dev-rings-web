import { initializeApp, cert } from "firebase-admin/app";

export const firebaseAdmin = initializeApp(
  {
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail:
        process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,
    }),
    databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
  },
  "dev-rings-admin"
);
