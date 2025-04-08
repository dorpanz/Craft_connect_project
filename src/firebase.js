// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVvzSsurEK4Pm6Rikb0nUIEOEceef6lKM",
  authDomain: "craft-connect-34318.firebaseapp.com",
  projectId: "craft-connect-34318",
  storageBucket: "craft-connect-34318.firebasestorage.app",
  messagingSenderId: "536012438740",
  appId: "1:536012438740:web:365bfc2fe38e5231f18f41",
  measurementId: "G-1LXDP1SMF8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();



