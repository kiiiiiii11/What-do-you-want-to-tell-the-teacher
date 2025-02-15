// 🔥 Firebase Config
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

    let heart = document.createElement("img");
    heart.src = "heart.png";

    let messageText = document.createElement("div");
    messageText.classList.add("message");
    messageText.innerHTML = `💬 ${data.message} <br> - ${data.name}, ชั้น ${data.class}, เลขที่ ${data.number}`;

    floatingItem.appendChild(heart);
    floatingItem.appendChild(messageText);

    floatingItem.style.left = Math.random() * 80 + "vw";
    floatingContainer.appendChild(floatingItem);

    setTimeout(() => {
        floatingContainer.removeChild(floatingItem);
    }, 10000);
});

// ✅ ปุ่มดูข้อความทั้งหมด
function showMessages() {
    window.location.href = "messages.html";
}
