// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6fzrQxsQDfyyL395BfI2rIT5HGphXO98",
  authDomain: "track-my-80cd3.firebaseapp.com",
  projectId: "track-my-80cd3",
  storageBucket: "track-my-80cd3.appspot.com",
  messagingSenderId: "355723062910",
  appId: "1:355723062910:web:254b5ce703f460cce9722f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
