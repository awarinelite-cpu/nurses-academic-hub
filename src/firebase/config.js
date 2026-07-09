// src/firebase/config.js
//
// 1) Go to https://console.firebase.google.com → create a project
//    (or reuse an existing one — a new project is cleaner since this
//    app's users/data are unrelated to MedIndex/NACON-EMR/NMCN-CBT).
// 2) Project settings → General → "Your apps" → Add app → Web (</>).
// 3) Copy the config object it gives you and paste the values below.
// 4) Build → Authentication → Sign-in method → enable "Email/Password".
// 5) Build → Firestore Database → Create database (production mode).
// 6) Paste the security rules from src/firebase/firestore.rules.txt
//    into Firestore → Rules in the console, then Publish.

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "PASTE_API_KEY_HERE",
  authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_PROJECT_ID.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
