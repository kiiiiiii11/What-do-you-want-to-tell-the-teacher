function sendMessage() {
    let nickname = document.getElementById("nickname").value;
    let studentClass = document.getElementById("studentClass").value;
    let teaching = document.getElementById("teaching").value;
    let personality = document.getElementById("personality").value;

    if (!nickname || !studentClass || !teaching || !personality) {
        alert("กรุณากรอกข้อมูลให้ครบทุกช่อง!");
        return;
    }

    let newMessage = {
        nickname,
        studentClass,
        teaching,
        personality
    };

    firebase.database().ref("messages").push(newMessage);
    showFloatingHeart(nickname, studentClass, teaching, personality);

    document.getElementById("nickname").value = "";
    document.getElementById("studentClass").value = "";
    document.getElementById("teaching").value = "";
    document.getElementById("personality").value = "";

    alert("ครูรับเรื่องแล้วจ้า!!");
}

function showFloatingHeart(nickname, studentClass, teaching, personality) {
    let container = document.getElementById("floatingContainer");
    let item = document.createElement("div");
    item.className = "floating-item";
    item.style.left = Math.random() * 80 + "vw"; 

    item.innerHTML = `
        <img src="heart.png" alt="💖">
        <div class="message">
            <strong>💖 ${nickname}</strong><br>
            🏫 ห้อง: ${studentClass} <br>
            📚 ${teaching} <br>
            😊 ${personality}
        </div>
    `;

    container.appendChild(item);
    setTimeout(() => { item.remove(); }, 8000);
}
