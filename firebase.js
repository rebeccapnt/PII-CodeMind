// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDjTBcmptG8yUaX1okpkbLtS0-5VGS0Q9A",
    authDomain: "codemind-b3a59.firebaseapp.com",
    projectId: "codemind-b3a59",
    storageBucket: "codemind-b3a59.appspot.com",
    messagingSenderId: "685073081335",
    appId: "1:685073081335:web:1a344052dc4ba03461c4f2",
    measurementId: "G-2VHFLDJRDQ",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);