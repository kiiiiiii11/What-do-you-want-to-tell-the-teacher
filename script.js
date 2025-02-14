// 🔥 Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyDn5AfvYFsFXAxcHN1vxR-8uoM4QDDhyak",
    authDomain: "lovekrukub.firebaseapp.com",
    databaseURL: "https://lovekrukub-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lovekrukub",
    storageBucket: "lovekrukub.firebasestorage.app",
    messagingSenderId: "994145435943",
    appId: "1:994145435943:web:ce1a4ba6fb754942ea6902",
    measurementId: "G-7VJR7QGYN8"
};

// 🔥 เชื่อม Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ✅ ฟังก์ชันบันทึกข้อความ
function sendMessage() {
    let name = document.getElementById("name").value;
    let studentClass = document.getElementById("class").value;
    let number = document.getElementById("number").value;
    let message = document.getElementById("message").value;

    if (name && studentClass && number && message) {
        let newMessageRef = db.ref("messages").push();
        newMessageRef.set({
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

// ✅ แสดงข้อความแบบเรียลไทม์
db.ref("messages").on("child_added", function(snapshot) {
    let data = snapshot.val();
    let floatingContainer = document.getElementById("floatingContainer");

    let floatingItem = document.createElement("div");
    floatingItem.classList.add("floating-item");

    // เพิ่มหัวใจ + ข้อความ
    let heart = document.createElement("img");
    heart.src = "heart.png";

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
