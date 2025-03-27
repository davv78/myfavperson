const questions = [
    {
        question: "Siapa yang selalu bikin hariku lebih indah?",
        options: ["Kamu 🥰", "Kucing tetangga 🐱", "Bu RT"],
        correct: 0
    },
    {
        question: "Siapa yang selalu bikin hariku lebih indah?",
        options: ["laptop 💻", "temen 🫂", "Kamu 🥰"],
        correct: 2
    },
    {
        question: "Aku paling suka apa dari kamu?",
        options: ["Senyummu 😊", "Ngambekmu 🤨", "Sedihnya kamu 😭"],
        correct: 0
    },
    {
        question: "Kalau aku bisa punya satu superpower, apa yang aku pilih?",
        options: ["Bisa baca pikiranmu 🧠", "Bisa teleport ke kamu ✨", "Bisa bikin mie instan dalam 2 detik 🍜"],
        correct: 1
    },
    {
        question: "Apa yang aku pikirin sebelum tidur?",
        options: ["Drama Korea 🎬", "Mau makan apa besok 🍔", "Kamu 💖"],
        correct: 2
    },
    {
        question: "Kalau aku punya 3 permintaan, salah satunya pasti...",
        options: ["Dapet motor baru 🏍️", "Kita bisa ketemu tiap hari 💏", "Punya uang banyak 💰"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
const gameContainer = document.getElementById("game");

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showApology();
        return;
    }

    const q = questions[currentQuestionIndex];
    gameContainer.innerHTML = `
        <h2>${q.question}</h2>
        ${q.options.map((option, i) => `
            <button class="option" onclick="checkAnswer(${i})">${option}</button>
        `).join('')}
    `;
}

function checkAnswer(selectedIndex) {
    const q = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll(".option");

    if (selectedIndex === q.correct) {
        buttons[selectedIndex].classList.add("correct");
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1000);
    } else {
        buttons[selectedIndex].classList.add("wrong");
        setTimeout(() => {
            buttons[selectedIndex].classList.remove("wrong");
        }, 500);
    }
}

function showApology() {
    gameContainer.innerHTML = `
        <div class="apology-box">
            <h2>🎉 Yeay! Kamu luar biasa! 🎉</h2>
            <p id="apology">Sayang, makasih udah main sampe akhir! Aku tau kadang aku suka ngeselin, tapi aku janji bakal selalu berusaha jadi yang terbaik buat kamu 💖</p>
            <div class="button-container">
                <button class="play-again" onclick="restartGame()">Main Lagi 🔄</button>
                <button class="forgive-btn" onclick="forgiveMe()">Maafin Aku 💕</button>
            </div>
        </div>
    `;
}

function forgiveMe() {
    const container = document.createElement("div");
    container.id = "forgive-container";
    container.innerHTML = `
        <div id="forgive-modal">
            <h2>Sayanggg 🥺💖</h2>
            <p>Kalau kamu maafin aku, kirim emot love di chat ya! 😘💕</p>
            <div class="forgive-buttons">
                <button id="forgive-yes">Maafin 💕</button>
                <button id="forgive-no">Hmm... 🤔</button>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    document.getElementById("forgive-yes").addEventListener("click", () => {
        showHearts();
        closeForgiveModal();
        showMessage("Yeay! Aku sayang kamu! 😍💕💕", true);
    });

    document.getElementById("forgive-no").addEventListener("click", () => {
        let btn = document.getElementById("forgive-no");
        btn.classList.add("shake");
        setTimeout(() => {
            btn.classList.remove("shake");
        }, 1000);
        showMessage("Coba pertimbangin lagi yaah sayang 😢💖", false);
    });
}

function closeForgiveModal() {
    const container = document.getElementById("forgive-container");
    if (container) document.body.removeChild(container);
}

function showHearts() {
    let heartEffect = document.createElement("div");
    heartEffect.innerHTML = "💖💖💖";
    heartEffect.className = "heart-effect";
    document.body.appendChild(heartEffect);

    setTimeout(() => {
        document.body.removeChild(heartEffect);
    }, 1500);
}

function showMessage(message, isLove) {
    const msgContainer = document.createElement("div");
    msgContainer.id = "message-container";
    msgContainer.innerHTML = `
        <div id="message-modal">
            <p>${message}</p>
            <button id="close-message">OK</button>
        </div>
    `;

    document.body.appendChild(msgContainer);
    
    document.getElementById("close-message").addEventListener("click", () => {
        document.body.removeChild(msgContainer);
    });

    if (isLove) {
        msgContainer.classList.add("love-effect");
    } else {
        msgContainer.classList.add("sad-effect");
    }
}


function closeForgiveModal() {
    const container = document.getElementById("forgive-container");
    if (container) document.body.removeChild(container);
}

function showHearts() {
    let heartEffect = document.createElement("div");
    heartEffect.innerHTML = "💖💖💖";
    heartEffect.className = "heart-effect";
    document.body.appendChild(heartEffect);

    setTimeout(() => {
        document.body.removeChild(heartEffect);
    }, 1500);
}


function restartGame() {
    currentQuestionIndex = 0;
    loadQuestion();
}

loadQuestion();
