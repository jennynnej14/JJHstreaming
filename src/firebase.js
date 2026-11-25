
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBYoWJ_b2UdGV-Hb4lInBXDmu2QCK4s0xU",
  authDomain: "jjhstreaming.firebaseapp.com",
  projectId: "jjhstreaming",
  storageBucket: "jjhstreaming.firebasestorage.app",
  messagingSenderId: "437008830052",
  appId: "1:437008830052:web:f9ca7cd7068ec493609971"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
