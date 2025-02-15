import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCqZRDgeN5itgNsX3lJIWP4e0djVfpInwk",
  authDomain: "what-do-you-want-tell-teacher.firebaseapp.com",
  databaseURL: "https://what-do-you-want-tell-teacher-default-rtdb.firebaseio.com",
  projectId: "what-do-you-want-tell-teacher",
  storageBucket: "what-do-you-want-tell-teacher.appspot.com",
  messagingSenderId: "614070987596",
  appId: "1:614070987596:web:3639b0defdb33cc0bcfde9"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const messagesRef = ref(database, "messages");

onChildAdded(messagesRef, (snapshot) => {
    let data = snapshot.val();
    createFloatingHeart(data.message, data.name, data.class, data.number);
});

// ฟังก์ชันสร้างหัวใจลอยขึ้นไป
function createFloatingHeart(message, name, studentClass, number) {
    const heartContainer = document.createElement("div");
    heartContainer.classList.add("floating-heart");

    const heartImage = document.createElement("img");
    heartImage.src = "heart.png"; // ใช้รูปหัวใจ
    heartImage.classList.add("heart-img");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("floating-text");
    messageDiv.innerHTML = `<strong>${message}</strong><br> - ${name}, ชั้น ${studentClass}, เลขที่ ${number}`;

    heartContainer.appendChild(heartImage);
    heartContainer.appendChild(messageDiv);
    document.body.appendChild(heartContainer);

    // กำหนดตำแหน่งเริ่มต้นแบบสุ่ม
    let startX = Math.random() * window.innerWidth;
    heartContainer.style.left = `${startX}px`;

    // ทำให้หัวใจลอยขึ้น
    setTimeout(() => {
        heartContainer.style.transform = `translateY(-100vh)`;
        heartContainer.style.opacity = "0";

        // ลบออกจาก DOM หลังจากแอนิเมชันจบ
        setTimeout(() => {
            heartContainer.remove();
        }, 5000);
    }, 100);
}
