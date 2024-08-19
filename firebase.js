// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaqcCeecVJFNrpMaFYsAuEj-80Wq9V9JY",
  authDomain: "inven-management-1e185.firebaseapp.com",
  projectId: "inven-management-1e185",
  storageBucket: "inven-management-1e185.appspot.com",
  messagingSenderId: "280821951514",
  appId: "1:280821951514:web:18cd71e7f138ca0fe735a3",
  measurementId: "G-7N5JY9F7RZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore}