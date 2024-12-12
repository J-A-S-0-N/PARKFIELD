"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// Import the functions you need from the SDKs you need
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAdr78cPbTT-ICc8qrZDjJPjgr-rTL8LlQ",
    authDomain: "parkfield-1a2da.firebaseapp.com",
    projectId: "parkfield-1a2da",
    storageBucket: "parkfield-1a2da.firebasestorage.app",
    messagingSenderId: "1041840939419",
    appId: "1:1041840939419:web:96d421bed1580222dc013e",
    measurementId: "G-NQJ2LQ78Q6"
};
// Initialize Firebase
var app = (0, app_1.initializeApp)(firebaseConfig);
exports.db = (0, firestore_1.getFirestore)(app);
