// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onChildAdded, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyByZHRGZ9D19oICXDGqVrcEQvNAZNkjppQ",
  authDomain: "whatdoyouwanttotellteacher3.firebaseapp.com",
  databaseURL: "https://whatdoyouwanttotellteacher3-default-rtdb.firebaseio.com",
  projectId: "whatdoyouwanttotellteacher3",
  storageBucket: "whatdoyouwanttotellteacher3.firebasestorage.app",
  messagingSenderId: "285919090323",
  appId: "1:285919090323:web:ee96b96de8e9d4dd0c9f66",
  measurementId: "G-XE0MVZ5Y1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ฟังก์ชันส่งข้อความ
function sendMessage() {
    let nickname = document.getElementById("nickname").value;
    let studentClass = document.getElementById("class").value;
    let teaching = document.getElementById("teaching").value;
    let personality = document.getElementById("personality").value;

    if (nickname && studentClass && teaching && personality) {
        const messageRef = ref(db, 'messages/' + new Date().getTime());
        set(messageRef, {
            nickname: nickname,
            studentClass: studentClass,
            teaching: teaching,
            personality: personality
        });

        alert("ครูรับเรื่องแล้วจ้า!! 💖");

        // ล้างข้อมูล
        document.getElementById("nickname").value = "";
        document.getElementById("class").value = "";
        document.getElementById("teaching").value = "";
        document.getElementById("personality").value = "";
    }
}

// แสดงข้อความแบบลอยขึ้นไป
const floatingContainer = document.getElementById("floatingContainer");

onChildAdded(ref(db, 'messages'), (snapshot) => {
    let data = snapshot.val();

    let floatingItem = document.createElement("div");
    floatingItem.classList.add("floating-item");

    let heart = document.createElement("img");
    heart.src = "heart.png"; // รูปหัวใจ
    heart.classList.add("floating-heart");

    let messageText = document.createElement("div");
    messageText.classList.add("floating-message");
    messageText.innerHTML = `💬 ${data.teaching} <br> - ${data.nickname}, ห้อง ${data.studentClass}`;

    floatingItem.appendChild(heart);
    floatingItem.appendChild(messageText);

    floatingItem.style.left = Math.random() * 80 + "vw";
    floatingContainer.appendChild(floatingItem);

    setTimeout(() => {
        floatingContainer.removeChild(floatingItem);
    }, 10000);
});

// แสดงข้อความทั้งหมด
function viewMessages() {
    let messagesBox = document.getElementById("messagesBox");
    messagesBox.innerHTML = "";

    get(ref(db, "messages")).then((snapshot) => {
        if (!snapshot.exists()) {
            messagesBox.innerHTML = "<p>ยังไม่มีข้อความ</p>";
            return;
        }

        snapshot.forEach((childSnapshot) => {
            let data = childSnapshot.val();
            let messageElement = document.createElement("div");
            messageElement.className = "message-box";
            messageElement.innerHTML = `
                <strong>💖 ${data.nickname}</strong> <br>
                🏫 ห้อง: ${data.studentClass} <br>
                📚 ${data.teaching} <br>
                😊 ${data.personality}
            `;
            messagesBox.appendChild(messageElement);
        });

        document.getElementById("messagesContainer").style.display = "block";
    });
}

// ปิดกล่องข้อความ
function closeMessages() {
    document.getElementById("messagesContainer").style.display = "none";
}

// ทำให้ฟังก์ชันสามารถเรียกใช้ใน HTML
window.sendMessage = sendMessage;
window.viewMessages = viewMessages;
window.closeMessages = closeMessages;
