// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onChildAdded } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn5AfvYFsFXAxcHN1vxR-8uoM4QDDhyak",
  authDomain: "lovekrukub.firebaseapp.com",
  databaseURL: "https://lovekrukub-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lovekrukub",
  storageBucket: "lovekrukub.firebasestorage.app",
  messagingSenderId: "994145435943",
  appId: "1:994145435943:web:4850f65240eba04fea6902",
  measurementId: "G-HN9HKP6LCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ฟังก์ชันส่งข้อความ
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

    // ล้างช่องกรอกข้อมูล
    document.getElementById("name").value = "";
    document.getElementById("class").value = "";
    document.getElementById("number").value = "";
    document.getElementById("message").value = "";
  }
}

// ฟังก์ชันแสดงข้อความที่ส่งแบบเรียลไทม์
const floatingContainer = document.getElementById("floatingContainer");

onChildAdded(ref(db, 'messages'), (snapshot) => {
  let data = snapshot.val();

  let floatingItem = document.createElement("div");
  floatingItem.classList.add("floating-item");

  // เพิ่มหัวใจ + ข้อความ
  let heart = document.createElement("img");
  heart.src = "heart.png";  // ใส่เส้นทางรูปหัวใจของคุณที่นี่

  let messageText = document.createElement("div");
  messageText.classList.add("message");
  messageText.innerHTML = `💬 ${data.message} <br> - ${data.name}, ชั้น ${data.class}, เลขที่ ${data.number}`;

  floatingItem.appendChild(heart);
  floatingItem.appendChild(messageText);

  // ตำแหน่งสุ่ม
  floatingItem.style.left = Math.random() * 80 + "vw";
  floatingContainer.appendChild(floatingItem);

  // ลบข้อความเมื่อออกจากจอ
  setTimeout(() => {
    floatingContainer.removeChild(floatingItem);
  }, 10000);
});
