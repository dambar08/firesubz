// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { env } from "@/env";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3_QR-Djy3uvc-kTMBfp0FkuR_sdHjP20",
  authDomain: "gamespot-95e44.firebaseapp.com",
  projectId: "gamespot-95e44",
  storageBucket: "gamespot-95e44.firebasestorage.app",
  messagingSenderId: "361851949491",
  appId: "1:361851949491:web:f593d31ae3cae57f8c7bc6",
  measurementId: "G-DRBTNDBLXS"
};

const createFirebaseClient = () => initializeApp(firebaseConfig);

const globalForFirebase = globalThis as unknown as {
  app: ReturnType<typeof createFirebaseClient> | undefined;
};

export const app = globalForFirebase.app ?? createFirebaseClient();

export const analytics = getAnalytics(app);

export const firestore = getFirestore(app);

if (env.NODE_ENV !== "production") globalForFirebase.app = app;