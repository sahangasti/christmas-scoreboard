import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsl6GT6xF3ATZgfDOVZ7-n-K5bpSThmoE",
  authDomain: "score-card-6feb3.firebaseapp.com",
  projectId: "score-card-6feb3",
  storageBucket: "score-card-6feb3.firebasestorage.app",
  messagingSenderId: "987675686320",
  appId: "1:987675686320:web:33c0bceac6808d40bd1275",
};

// ✅ PREVENT DUPLICATE APP INITIALIZATION
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
