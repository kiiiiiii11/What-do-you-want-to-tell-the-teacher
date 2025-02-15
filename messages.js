import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const messagesList = document.getElementById("messages-list");
const messagesRef = ref(database, "messages");

onChildAdded(messagesRef, (snapshot) => {
    let data = snapshot.val();
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message-box");
    messageDiv.innerHTML = `<strong>💬 ${data.message}</strong> <br> - ${data.name}, ชั้น ${data.class}, เลขที่ ${data.number}`;
    messagesList.appendChild(messageDiv);
});
