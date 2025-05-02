import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8sn9x3Nlqgz_UjTBZcBujvbG0gBHMLzo",
  authDomain: "crud-4ba4a.firebaseapp.com",
  projectId: "crud-4ba4a",
  storageBucket: "crud-4ba4a.firebasestorage.app",
  messagingSenderId: "215300719142",
  appId: "1:215300719142:web:56d4f02d70f78bd6dd1ce7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;
