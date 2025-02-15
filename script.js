// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onChildAdded } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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
    let name = document.getElementById("name").value;
    let studentClass = document.getElementById("class").value;
    let number = document.getElementById("number").value;
    let message = document.getElementById("message").value;

    if (name && studentClass && number && message) {
        const messageRef = ref(db, 'messages/' + new Date().getTime());
        set(messageRef, {
            name: name,
            class: studentClass,
            number: number,
            message: message
        });

        alert("ครูรับเรื่องแล้วจ้า!! 💖");

        // ล้างข้อมูล
        document.getElementById("name").value = "";
        document.getElementById("class").value = "";
        document.getElementById("number").value = "";
        document.getElementById("message").value = "";
    }
}

// ฟังก์ชันเพื่อเปิด/ปิดการดูข้อความ
function toggleMessages() {
    const messagesContainer = document.getElementById("messagesContainer");
    messagesContainer.style.display = messagesContainer.style.display === "block" ? "none" : "block";
}

// ฟังก์ชันปิดการดูข้อความ
function closeMessages() {
    document.getElementById("messagesContainer").style.display = "none";
}

// แสดงข้อความในลักษณะลอยขึ้นพร้อมหัวใจ
const floatingContainer = document.getElementById("floatingContainer");
const messagesBox = document.getElementById("messagesBox");

onChildAdded(ref(db, 'messages'), (snapshot) => {
    let data = snapshot.val();

    let floatingItem = document.createElement("div");
    floatingItem.classList.add("floating-item");

    let heart = document.createElement("img");
    heart.src = "heart.png"; // หัวใจที่ใช้แสดง (สามารถเปลี่ยนเป็นไฟล์ที่ต้องการ)

    let messageText = document.createElement("div");
    messageText.classList.add("message");
    messageText.innerHTML = `💬 ${data.message} <br> - ${data.name}, ชั้น ${data.class}, เลขที่ ${data.number}`;

    floatingItem.appendChild(heart);
    floatingItem.appendChild(messageText);

    // ตั้งค่าตำแหน่งสุ่ม
    floatingItem.style.left = Math.random() * 80 + "vw";
    floatingContainer.appendChild(floatingItem);

    // ลบข้อความเมื่อหมดเวลา
    setTimeout(() => {
        floatingContainer.removeChild(floatingItem);
    }, 10000);

    // แสดงข้อความทั้งหมดในกล่อง
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.innerHTML = `💬 ${data.message} <br> - ${data.name}, ชั้น ${data.class}, เลขที่ ${data.number}`;
    messagesBox.appendChild(messageDiv);
});

// ทำให้ฟังก์ชันใช้งานได้ใน HTML
window.sendMessage = sendMessage;
window.toggleMessages = toggleMessages;
window.closeMessages = closeMessages;
