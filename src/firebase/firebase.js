// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxuYWXfAdrkP1qJkJCgZ-rZoHFdxC65pc",
  authDomain: "authentication-system-12561.firebaseapp.com",
  projectId: "authentication-system-12561",
  storageBucket: "authentication-system-12561.firebasestorage.app",
  messagingSenderId: "875913222945",
  appId: "1:875913222945:web:e023fc8b8481eb7399bc60",
  measurementId: "G-WFWRR54SB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

export {app,auth};
