// src/firebase/sync.js
//
// Bridges the app's existing localStorage-based `ls`/`lsSet` helpers to
// Firestore, so data syncs across devices without rewriting every
// component that reads/writes local storage.
//
// Model: "pull on load, push on write" — not live real-time sync. When
// the app boots (or a user signs in), the latest cloud copy of every
// synced key is pulled down into localStorage. From then on, any write
// through `lsSet` is pushed back up to Firestore in the background.
// A second device will see the change the next time it loads the app.

import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

// Admin-managed content — shared across every user, doc path: sync/{key}
export const SHARED_KEYS = [
  "nv-classes", "nv-drugs", "nv-labs", "nv-pq", "nv-decks",
  "nv-dict", "nv-skillsdb", "nv-announcements", "nv-handouts",
];

// Personal per-student content — doc path: personal/{uid}/data/{key}
export const PERSONAL_KEYS = [
  "nv-results", "nv-gpa-courses", "nv-timetable", "nv-tasks",
  "nv-skills-done", "nv-messages",
];

let currentUid = null;
export const setSyncUid = (uid) => { currentUid = uid; };

const sharedRef = (key) => doc(db, "sync", key);
const personalRef = (uid, key) => doc(db, "personal", uid, "data", key);

/** Push a single key's value up to Firestore. Fire-and-forget — never
 *  throws into the caller, since local writes must always succeed even
 *  if the network / cloud write fails. */
export function pushKey(key, value) {
  try {
    if (SHARED_KEYS.includes(key)) {
      setDoc(sharedRef(key), { data: value, updatedAt: serverTimestamp() }).catch(
        (e) => console.warn("[sync] push failed", key, e)
      );
    } else if (PERSONAL_KEYS.includes(key) && currentUid) {
      setDoc(personalRef(currentUid, key), { data: value, updatedAt: serverTimestamp() }).catch(
        (e) => console.warn("[sync] push failed", key, e)
      );
    }
  } catch (e) {
    console.warn("[sync] push threw", key, e);
  }
}

/** Pull every synced key down from Firestore into localStorage.
 *  If a cloud doc doesn't exist yet but a local value does (e.g. the
 *  freshly-seeded defaults on first-ever launch), push the local value
 *  up as the seed so the next device to load sees it too.
 *  Call this once at boot and again right after sign-in. */
export async function pullAllFromCloud(uid, { lsSetRaw, lsRaw }) {
  const jobs = [];

  for (const key of SHARED_KEYS) {
    jobs.push(
      getDoc(sharedRef(key)).then((snap) => {
        if (snap.exists()) {
          lsSetRaw(key, snap.data().data);
        } else {
          const local = lsRaw(key, null);
          if (local !== null) pushKey(key, local);
        }
      }).catch((e) => console.warn("[sync] pull failed", key, e))
    );
  }

  if (uid) {
    for (const key of PERSONAL_KEYS) {
      jobs.push(
        getDoc(personalRef(uid, key)).then((snap) => {
          if (snap.exists()) {
            lsSetRaw(key, snap.data().data);
          } else {
            const local = lsRaw(key, null);
            if (local !== null) pushKey(key, local);
          }
        }).catch((e) => console.warn("[sync] pull failed", key, e))
      );
    }
  }

  await Promise.all(jobs);
}
