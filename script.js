import { database, ref, push, onValue } from "./firebase.js";

// ฟังก์ชันส่งข้อความ
document.getElementById("submit-btn").addEventListener("click", () => {
    let name = document.getElementById("name").value;
    let room = document.getElementById("room").value;
    let teaching = document.getElementById("teaching").value;
    let personality = document.getElementById("personality").value;

    if (name.trim() === "" || room.trim() === "" || teaching.trim() === "" || personality.trim() === "") {
        alert("กรุณากรอกข้อมูลให้ครบทุกช่อง!");
        return;
    }

    let messageRef = ref(database, "messages");
    push(messageRef, {
        name: name,
        room: room,
        teaching: teaching,
        personality: personality
    }).then(() => {
        alert("ครูรับเรื่องแล้วจ้า!!");
        createFloatingHeart(name, room, teaching, personality);
        clearForm();
    }).catch((error) => {
        console.error("Error sending message:", error);
    });
});

// ฟังก์ชันล้างข้อมูลหลังส่ง
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("room").value = "";
    document.getElementById("teaching").value = "";
    document.getElementById("personality").value = "";
}

// ฟังก์ชันสร้างหัวใจ + ข้อความลอยขึ้น
function createFloatingHeart(name, room, teaching, personality) {
    let floatingContainer = document.querySelector(".floating-container");

    let floatingItem = document.createElement("div");
    floatingItem.classList.add("floating-item");
    floatingItem.style.left = `${Math.random() * 80 + 10}%`;

    let heartImg = document.createElement("img");
    heartImg.src = "heart.png";
    heartImg.classList.add("floating-heart");

    let floatingMessage = document.createElement("div");
    floatingMessage.classList.add("floating-message");
    floatingMessage.innerHTML = `<b>${name}</b> (${room})<br>${teaching}<br>${personality}`;

    floatingItem.appendChild(heartImg);
    floatingItem.appendChild(floatingMessage);
    floatingContainer.appendChild(floatingItem);

    setTimeout(() => {
        floatingItem.remove();
    }, 12000);
}

// ฟังก์ชันเปิดดูข้อความทั้งหมด
document.getElementById("view-messages-btn").addEventListener("click", () => {
    let messagesContainer = document.getElementById("messages-container");
    let messagesBox = document.getElementById("messages-box");

    messagesBox.innerHTML = "<p>กำลังโหลดข้อมูล...</p>";

    let messageRef = ref(database, "messages");
    onValue(messageRef, (snapshot) => {
        messagesBox.innerHTML = "";
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                let data = childSnapshot.val();
                let messageItem = document.createElement("div");
                messageItem.classList.add("message-box");
                messageItem.innerHTML = `<b>${data.name}</b> (${data.room})<br>${data.teaching}<br>${data.personality}`;
                messagesBox.appendChild(messageItem);
            });
        } else {
            messagesBox.innerHTML = "<p>ยังไม่มีข้อความ</p>";
        }
    });

    messagesContainer.style.display = "block";
});

// ปิดหน้าต่างข้อความทั้งหมด
document.getElementById("close-messages-btn").addEventListener("click", () => {
    document.getElementById("messages-container").style.display = "none";
});
