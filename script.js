import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";

// Your web app's Firebase configuration
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

// ตัวแปร DOM
const form = document.getElementById("feedback-form");
const messagesContainer = document.getElementById("messages-container");
const viewMessagesButton = document.getElementById("view-messages-btn");
const closeMessagesButton = document.getElementById("close-messages-btn");

// ส่งข้อมูลไปยัง Firebase
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nickname = document.getElementById("nickname").value;
  const classRoom = document.getElementById("class-room").value;
  const teachingStyle = document.getElementById("teaching-style").value;
  const personality = document.getElementById("personality").value;

  const messageId = new Date().getTime(); // ใช้เวลาปัจจุบันเป็น ID

  // สร้างข้อมูลใน Firebase
  set(ref(db, "messages/" + messageId), {
    nickname: nickname,
    classRoom: classRoom,
    teachingStyle: teachingStyle,
    personality: personality,
  }).then(() => {
    alert("ครูรับเรื่องแล้วจ้า💕");
  });

  // ล้างข้อมูลจากฟอร์ม
  form.reset();
});

// ฟังก์ชันแสดงข้อความทั้งหมด
viewMessagesButton.addEventListener("click", function () {
  get(child(ref(db), "messages")).then((snapshot) => {
    if (snapshot.exists()) {
      const messages = snapshot.val();
      let messageHtml = "";
      for (const messageId in messages) {
        const message = messages[messageId];
        messageHtml += `
          <div class="message-box">
            <p><strong>นามแฝง/นามในวงการ:</strong> ${message.nickname}</p>
            <p><strong>ห้อง:</strong> ${message.classRoom}</p>
            <p><strong>การจัดการเรียนการสอน:</strong> ${message.teachingStyle}</p>
            <p><strong>ลักษณะบุคลิกภาพ:</strong> ${message.personality}</p>
          </div>
        `;
      }
      document.getElementById("messages-box").innerHTML = messageHtml;
      messagesContainer.style.display = "block";
    }
  });
});

// ฟังก์ชันปิดการดูข้อความทั้งหมด
closeMessagesButton.addEventListener("click", function () {
  messagesContainer.style.display = "none";
});
