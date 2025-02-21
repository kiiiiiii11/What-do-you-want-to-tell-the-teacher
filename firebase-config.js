import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCqZRDgeN5itgNsX3lJIWP4e0djVfpInwk",
    authDomain: "what-do-you-want-tell-teacher.firebaseapp.com",
    databaseURL: "https://what-do-you-want-tell-teacher-default-rtdb.firebaseio.com",
    projectId: "what-do-you-want-tell-teacher",
    storageBucket: "what-do-you-want-tell-teacher.firebasestorage.app",
    messagingSenderId: "614070987596",
    appId: "1:614070987596:web:3639b0defdb33cc0bcfde9",
    measurementId: "G-ZY48RBELXE"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
