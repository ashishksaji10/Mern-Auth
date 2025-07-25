// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-df247.firebaseapp.com",
  projectId: "mern-auth-df247",
  storageBucket: "mern-auth-df247.firebasestorage.app",
  messagingSenderId: "492156071615",
  appId: "1:492156071615:web:5db38797f8aab0270b600a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);