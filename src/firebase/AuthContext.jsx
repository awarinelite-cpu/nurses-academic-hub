// src/firebase/AuthContext.jsx
import { createContext, useContext } from "react";

export const UidContext = createContext(null);
export const useUid = () => useContext(UidContext);
