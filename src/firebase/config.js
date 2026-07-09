// src/firebase/config.js
//
// Firebase project: medicare-c6196
// Console: https://console.firebase.google.com/project/medicare-c6196
//
// Still required before this works:
// 1) Build → Authentication → Sign-in method → enable "Email/Password".
// 2) Build → Firestore Database → Create database (if not already set up).
// 3) Paste the security rules from src/firebase/firestore.rules.txt
//    into Firestore → Rules in the console, then Publish.

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_bSeHflIDhihDhDUE1p1kKZpJId0dxA8",
  authDomain: "medicare-c6196.firebaseapp.com",
  projectId: "medicare-c6196",
  storageBucket: "medicare-c6196.firebasestorage.app",
  messagingSenderId: "632103735569",
  appId: "1:632103735569:web:bdf4d61b0b498ec4fbbcb0",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


