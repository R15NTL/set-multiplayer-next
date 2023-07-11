import {
  AppOptions,
  cert,
  getApp,
  getApps,
  initializeApp,
  ServiceAccount,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getEnv } from "@/utils";

const credentials: ServiceAccount = {
  projectId: getEnv("FIREBASE_PROJECT_ID"),
  privateKey: getEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
  clientEmail: getEnv("FIREBASE_CLIENT_EMAIL"),
};

const options: AppOptions = {
  credential: cert(credentials),
  databaseURL: process.env.databaseURL,
};

function createFirebaseAdminApp(config: AppOptions) {
  if (getApps().length === 0) {
    return initializeApp(config);
  } else {
    return getApp();
  }
}

const firebaseAdmin = createFirebaseAdminApp(options);
export const adminAuth = getAuth(firebaseAdmin);
