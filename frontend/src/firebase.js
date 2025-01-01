// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-f680a.firebaseapp.com",
  projectId: "mern-auth-f680a",
  storageBucket: "mern-auth-f680a.firebasestorage.app",
  messagingSenderId: "294667896861",
  appId: "1:294667896861:web:50eb48262ddd219822def4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);