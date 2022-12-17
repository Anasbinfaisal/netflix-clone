// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8jOcR__s5dLDsKIda23uxSlczrHJ21SE",
  authDomain: "netflix-clone-a65b9.firebaseapp.com",
  projectId: "netflix-clone-a65b9",
  storageBucket: "netflix-clone-a65b9.appspot.com",
  messagingSenderId: "718455932878",
  appId: "1:718455932878:web:b8bedfca3b5553bea60d9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(app);