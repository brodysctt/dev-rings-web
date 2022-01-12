import { getApps, App, initializeApp, cert } from "firebase-admin/app";

const apps = getApps();

let admin: App;
if (!apps.length) {
  admin = initializeApp(
    {
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail:
          process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
        privateKey:
          process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY!.replace(
            /\\n/g,
            "\n"
          ),
      }),
      databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
    },
    "dev-rings-admin"
  );
} else {
  admin = apps[0];
}

export { admin };
