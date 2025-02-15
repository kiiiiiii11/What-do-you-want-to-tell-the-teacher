import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

window.sendMessage = function() {
    let name = document.getElementById("name").value;
    let studentClass = document.getElementById("class").value;
    let number = document.getElementById("number").value;
    let message = document.getElementById("message").value;

    if (name && studentClass && number && message) {
        let messagesRef = ref(database, "messages");
        let newMessageRef = push(messagesRef);

        set(newMessageRef, {
            name: name,
            class: studentClass,
            number: number,
            message: message
        }).then(() => {
            alert("ครูรับเรื่องแล้วจ้า!! 💖");

            // เคลียร์ฟอร์ม
            document.getElementById("name").value = "";
            document.getElementById("class").value = "";
            document.getElementById("number").value = "";
            document.getElementById("message").value = "";
        }).catch((error) => {
            console.error("เกิดข้อผิดพลาด: ", error);
            alert("เกิดข้อผิดพลาด กรุณาลองใหม่!");
        });

    } else {
        alert("กรุณากรอกข้อมูลให้ครบทุกช่อง!");
    }
};
