import { initializeApp } from "firebase/app";
import { collection, doc, getDoc ,getFirestore, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdr78cPbTT-ICc8qrZDjJPjgr-rTL8LlQ",
  authDomain: "parkfield-1a2da.firebaseapp.com",
  projectId: "parkfield-1a2da",
  storageBucket: "parkfield-1a2da.firebasestorage.app",
  messagingSenderId: "1041840939419",
  appId: "1:1041840939419:web:96d421bed1580222dc013e",
  measurementId: "G-NQJ2LQ78Q6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
