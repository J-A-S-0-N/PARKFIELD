// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdr78cPbTT-ICc8qrZDjJPjgr-rTL8LlQ",
  authDomain: "parkfield-1a2da.firebaseapp.com",
  projectId: "parkfield-1a2da",
  storageBucket: "parkfield-1a2da.firebasestorage.app",
  messagingSenderId: "1041840939419",
  appId: "1:1041840939419:web:96d421bed1580222dc013e",
  measurementId: "G-NQJ2LQ78Q6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
