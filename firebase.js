// Import ฟังก์ชันจาก Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// ตั้งค่า Firebase
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

export { database, ref, push, onValue };
