// src/firebase/useSynced.js
//
// Drop-in replacement for `useState(()=>ls(key, default))` that also
// subscribes to Firestore in real time, so changes made on one device
// (or by an admin) appear on other open devices/tabs immediately —
// no reload needed. Local state is still the source of truth for
// rendering; onSnapshot just pushes fresh cloud data into it.
//
// Usage is identical to the old pattern:
//   const [classes, setClasses] = useSynced("nv-classes", DEFAULT_CLASSES);
// Existing code that calls lsSet(key, value) right after setClasses(...)
// keeps working unchanged — that's still what pushes writes to the cloud.

import { useState, useEffect, useRef } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./config";
import { SHARED_KEYS, PERSONAL_KEYS } from "./sync";
import { useUid } from "./AuthContext";

const ls = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
const lsSetRaw = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

export function useSynced(key, defaultValue) {
  const [value, setValue] = useState(() => ls(key, defaultValue));
  const uid = useUid();
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    let ref = null;
    if (SHARED_KEYS.includes(key)) {
      ref = doc(db, "sync", key);
    } else if (PERSONAL_KEYS.includes(key) && uid) {
      ref = doc(db, "personal", uid, "data", key);
    }
    if (!ref) return;

    const unsub = onSnapshot(ref, (snap) => {
      if (!mounted.current) return;
      if (snap.exists()) {
        const cloudValue = snap.data().data;
        lsSetRaw(key, cloudValue);
        setValue(cloudValue);
      }
    }, (e) => console.warn("[useSynced] listen failed", key, e));

    return () => { mounted.current = false; unsub(); };
  }, [key, uid]);

  return [value, setValue];
}
