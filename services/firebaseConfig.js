// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBleEOw6Hg-T7VoKc_Hnq0lz3g3J30A-Ac",
  authDomain: "codemind-32cd1.firebaseapp.com",
  projectId: "codemind-32cd1",
  storageBucket: "codemind-32cd1.appspot.com",
  messagingSenderId: "613388872005",
  appId: "1:613388872005:web:df0f2a2fd9507df5e7762c",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default { firebase, db };
