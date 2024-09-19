// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFfBLlJ6hEMYdEmds_ljEA58JsRqRilXs",
  authDomain: "flixgpt-8565b.firebaseapp.com",
  projectId: "flixgpt-8565b",
  storageBucket: "flixgpt-8565b.appspot.com",
  messagingSenderId: "784695851076",
  appId: "1:784695851076:web:34bf811f43b05bbf006411",
  measurementId: "G-KKNHMSWGBN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();