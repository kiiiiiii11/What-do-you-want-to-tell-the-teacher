import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onChildAdded } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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
const db = getDatabase(app);

function sendMessage() {
    let name = document.getElementById("name").value;
    let studentClass = document.getElementById("class").value;
    let number = document.getElementById("number").value;
    let message = document.getElementById("message").value;

    if (name && studentClass && number && message) {
        const messageRef = ref(db, 'messages/' + new Date().getTime());
        set(messageRef, { name, class: studentClass, number, message });

        alert("ครูรับเรื่องแล้วจ้า!! 💖");
        document.getElementById("name").value = "";
        document.getElementById("class").value = "";
        document.getElementById("number").value = "";
        document.getElementById("message").value = "";
    }
}

function viewAllMessages() {
    window.location.href = "messages.html";
}

window.sendMessage = sendMessage;
window.viewAllMessages = viewAllMessages;
