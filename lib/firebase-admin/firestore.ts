import { admin } from "@lib/firebase-admin/admin";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(admin);

export const fetchLogDoc = async (userId: string, dateString: string) =>
  await db
    .collection("users")
    .doc(userId)
    .collection("logs")
    .doc(dateString)
    .get();
