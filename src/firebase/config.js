// src/firebase/config.js
//
// 1) Go to https://console.firebase.google.com → create a project
//    (or reuse an existing one — a new project is cleaner since this
//    app's users/data are unrelated to MedIndex/NACON-EMR/NMCN-CBT).
// 2) Project settings → General → "Your apps" → Add app → Web (</>).
// 3) Copy the config values it gives you into Vercel's Environment
//    Variables (Project → Settings → Environment Variables) using the
//    VITE_FIREBASE_* names below — see .env.example for the full list.
//    For local dev, copy .env.example to .env and fill it in there
//    instead (a plain .env file is already gitignored).
// 4) Build → Authentication → Sign-in method → enable "Email/Password".
// 5) Build → Firestore Database → Create database (production mode).
// 6) Paste the security rules from src/firebase/firestore.rules.txt
//    into Firestore → Rules in the console, then Publish.
// 7) Redeploy on Vercel after adding the env vars — Vite bakes them
//    into the build at build time, so a plain env-var save alone
//    won't update an already-built deployment.

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey) {
  console.error(
    "[firebase] Missing VITE_FIREBASE_* environment variables. " +
    "Set them in Vercel (Project → Settings → Environment Variables) " +
    "or in a local .env file, then redeploy/restart. See src/firebase/config.js."
  );
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

