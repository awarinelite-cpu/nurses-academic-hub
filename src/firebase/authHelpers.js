// src/firebase/authHelpers.js
//
// The app's UI is username-based, but Firebase Auth needs an email.
// We derive a synthetic email from the username (lowercased, sanitized)
// so real passwords are always handled by Firebase Auth itself — never
// stored in plaintext anywhere, unlike the old localStorage array.

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./config";

const EMAIL_DOMAIN = "nursesacademichub.local";

const usernameToEmail = (username) =>
  `${username.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "")}@${EMAIL_DOMAIN}`;

export async function registerUser({ username, password, className }) {
  const email = usernameToEmail(username);
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: username });

  const profile = {
    username,
    role: "student",
    class: className || "",
    joined: new Date().toLocaleDateString(),
  };
  await setDoc(doc(db, "users", cred.user.uid), profile);
  return { uid: cred.user.uid, ...profile };
}

export async function loginUser({ username, password }) {
  const email = usernameToEmail(username);
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const snap = await getDoc(doc(db, "users", cred.user.uid));
  if (!snap.exists()) {
    // Auth account exists but no Firestore profile (shouldn't normally
    // happen) — create a minimal student profile so the app still works.
    const profile = { username, role: "student", class: "", joined: new Date().toLocaleDateString() };
    await setDoc(doc(db, "users", cred.user.uid), profile);
    return { uid: cred.user.uid, ...profile };
  }
  return { uid: cred.user.uid, ...snap.data() };
}

export async function logoutUser() {
  await signOut(auth);
}

export async function fetchProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? { uid, ...snap.data() } : null;
}
