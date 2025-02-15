import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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

const messagesList = document.getElementById("messagesList");

onChildAdded(ref(db, 'messages'), (snapshot) => {
    let data = snapshot.val();
    let li = document.createElement("li");
    li.innerHTML = `<strong>${data.name}</strong> (ชั้น ${data.class}, เลขที่ ${data.number}):<br> ${data.message}`;
    messagesList.prepend(li);
});

function goBack() {
    window.location.href = "index.html";
}

window.goBack = goBack;
