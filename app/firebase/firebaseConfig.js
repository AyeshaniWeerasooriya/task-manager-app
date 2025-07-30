// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUWO6YrMO7vVVSQn2fGx_kJFxmX0n_G9k",
  authDomain: "task-manager-1c664.firebaseapp.com",
  projectId: "task-manager-1c664",
  storageBucket: "task-manager-1c664.firebasestorage.app",
  messagingSenderId: "912987859704",
  appId: "1:912987859704:web:c4f1a38aaca53f165aa90d",
  measurementId: "G-DJX9772P7Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
