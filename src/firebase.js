
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgtc1Z3kM5xLrCj3kDtEGsS3xFXBjp6W8",
  authDomain: "valentines-streaming.firebaseapp.com",
  projectId: "valentines-streaming",
  storageBucket: "valentines-streaming.firebasestorage.app",
  messagingSenderId: "437008830052",
  appId: "1:614403496710:web:a925028d8964075e54dc87"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
