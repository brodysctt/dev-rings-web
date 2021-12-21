// @ts-ignore
const cors = require("cors")({ origin: true });
import * as admin from "firebase-admin";
admin.initializeApp();

export const db = admin.firestore();
