import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyALGJg-4hCB8tf2ZvP2NujQ9r0QXz4A9XY",
  authDomain: "fitnes-77644.firebaseapp.com",
  projectId: "fitnes-77644",
  storageBucket: "fitnes-77644.appspot.com",
  messagingSenderId: "820469081015",
  appId: "1:820469081015:web:bc4562518139b26570fe32",
  measurementId: "G-YMLK3PY253"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);