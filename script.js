// Firebase Configuration
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
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ฟังก์ชันสำหรับส่งข้อความ
function sendMessage() {
    let name = document.getElementById("name").value;
    let studentClass = document.getElementById("class").value;
    let number = document.getElementById("number").value;
    let message = document.getElementById("message").value;

    if (name && studentClass && number && message) {
        const messageRef = db.ref('messages/' + new Date().getTime());
        messageRef.set({
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

// แสดงข้อความในลักษณะลอยขึ้น
const floatingContainer = document.getElementById("floatingContainer");

firebase.database().ref('messages').on('child_added', (snapshot) => {
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
});
