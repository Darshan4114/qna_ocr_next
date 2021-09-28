// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
  apiKey: "AIzaSyCknJDGDuqVMVusm6x5ex1xV7M_1CWi2m8",
  authDomain: "my-ocr-next.firebaseapp.com",
  projectId: "my-ocr-next",
  storageBucket: "my-ocr-next.appspot.com",
  messagingSenderId: "427952107656",
  appId: "1:427952107656:web:5a6f389031455d231f6f3d",
  measurementId: "G-MPG94HV8MX",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export default app;
