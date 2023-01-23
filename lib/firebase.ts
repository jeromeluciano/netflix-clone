// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIXL5bsyPL-WmydrXiMFvHRYjDjEcnjq8",
  authDomain: "netflix-clone-7bbf3.firebaseapp.com",
  projectId: "netflix-clone-7bbf3",
  storageBucket: "netflix-clone-7bbf3.appspot.com",
  messagingSenderId: "1057190674548",
  appId: "1:1057190674548:web:dee055e9187c12dcef9121",
  measurementId: "G-P7R72MFCL8",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
