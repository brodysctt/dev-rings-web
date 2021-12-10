import { admin } from "@lib/firebase-admin/admin";
import { getAuth } from "firebase-admin/auth";

const auth = getAuth(admin);

export const verifyToken = async (token: string) =>
  await auth.verifyIdToken(token);
