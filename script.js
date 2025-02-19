import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase Configuration
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
const db = getDatabase(app);

// ฟังก์ชันสำหรับส่งข้อความ
function sendMessage() {
    let nickname = document.getElementById("nickname").value;
    let room = document.getElementById("room").value;
    let teaching = document.getElementById("teaching").value;
    let personality = document.getElementById("personality").value;

    if (nickname && room && teaching && personality) {
        const messageRef = ref(db, 'messages/' + new Date().getTime());
        set(messageRef, {
            nickname: nickname,
            room: room,
            teaching: teaching,
            personality: personality
        });

        alert("ครูรับเรื่องแล้วจ้า!! 💖");

        document.getElementById("nickname").value = "";
        document.getElementById("room").value = "";
        document.getElementById("teaching").value = "";
        document.getElementById("personality").value = "";
    }
}

// แสดงข้อความทั้งหมด
function showMessages() {
    document.getElementById("messagesContainer").style.display = "block";
}

function hideMessages() {
    document.getElementById("messagesContainer").style.display = "none";
}

// แสดงข้อความแบบลอยขึ้น
onChildAdded(ref(db, 'messages'), (snapshot) => {
    let data = snapshot.val();
    let messageBox = document.createElement("div");
    messageBox.classList.add("message");
    messageBox.innerHTML = `💬 ${data.personality} <br> - ${data.nickname}, ห้อง ${data.room}`;

    document.getElementById("messagesBox").appendChild(messageBox);
});

window.sendMessage = sendMessage;
window.showMessages = showMessages;
window.hideMessages = hideMessages;
