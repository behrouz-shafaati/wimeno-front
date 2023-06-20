// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9IZriAYQA8qQUTvXkQNV-vimMBZG_hj0",
  authDomain: "next-fairebase-test.firebaseapp.com",
  projectId: "next-fairebase-test",
  storageBucket: "next-fairebase-test.appspot.com",
  messagingSenderId: "451285206765",
  appId: "1:451285206765:web:b774ef98e197d030d3eee4",
};

// Initialize Firebase for SSR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const auth = getAuth(app);

// Expose the instances we'll need
export { app, auth };
