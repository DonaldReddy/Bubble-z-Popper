let colors = ["white", "blue", "red", "green", "yellow"];
let cont = document.getElementsByClassName("container")[0];
let curScore = 0, highScore = localStorage.getItem("high_score") || 0;
let missed = 0
let popSound = new Audio("./sounds/pop.mp3");
let gameOverSound = new Audio("./sounds/gameOver.wav");
let screenWidth = screen.width > 600 ? 900 : 350;
let backGroundMusic = new Audio("./sounds/background.mp3");

document.addEventListener("click", () => {
    setTimeout(playBG, 1000);
}, { once: true });

function playBG() {
    backGroundMusic.play();
    setInterval(playBG, 78000);
}

function rColor() {
    return colors[Math.floor(Math.random() * 5)];
}

function gameOver() {
    backGroundMusic.volume = 0;
    gameOverSound.play();
    updateHighScore();
    cont.style.display = "flex";
    document.getElementsByClassName("game-over")[0].style.display = "flex";
    cont.removeEventListener("touchstart", (event) => {
        inside(event);
    });
    cont.removeEventListener("touchmove", (event) => {
        inside(event);
    });
    document.getElementsByClassName("try-again")[0].addEventListener("touchstart", start);
}

function updateHighScore() {
    highScore = Math.max(highScore, curScore);
    localStorage.setItem("high_score", highScore);
    document.querySelector("#high-score span").innerText = highScore;
}

function updateScore() {
    curScore++;
    document.querySelector("#score span").innerText = curScore;
}

function popBubble(event) {
    event.target.remove();
    updateScore();
}

function inside(event) {
    let coOrd = document.getElementsByClassName("bubble")[0].getBoundingClientRect();
    let x1 = coOrd.left, x2 = coOrd.right, y1 = coOrd.top, y2 = coOrd.bottom;
    let X = event.changedTouches[0].clientX, Y = event.changedTouches[0].clientY;
    if ((x1 <= X && X <= x2) && (y1 <= Y && Y <= y2)) {
        popSound.play();
        document.getElementsByClassName("bubble")[0].remove();
        updateScore();
        addBubble();
    }
}

function addBubble() {
    if (missed === 10) {
        gameOver();
        return;
    }
    let newDiv = document.createElement("div");
    newDiv.classList.add("bubble");
    newDiv.style.backgroundColor = rColor();
    newDiv.style.left = `${Math.floor(Math.random() * screenWidth)}px`;
    cont.appendChild(newDiv);

    newDiv.addEventListener("mouseenter", (event) => { popSound.play(); popBubble(event); addBubble(); });

    newDiv.addEventListener("animationend", () => {
        newDiv.remove();
        missed++;
        document.querySelector("#missed span").innerText = missed;
        addBubble();
    });
}

function start() {
    backGroundMusic.volume = 0.3
    curScore = 0;
    missed = 0;
    highScore = localStorage.getItem("high_score") || 0;
    updateHighScore();

    cont.addEventListener("touchstart", (event) => {
        event.preventDefault();
        inside(event);
    });

    cont.addEventListener("touchmove", (event) => {
        event.preventDefault();
        inside(event);
    });

    document.getElementsByClassName("game-over")[0].style.display = "none";
    document.querySelector("#score span").innerText = curScore;
    document.querySelector("#missed span").innerText = missed;

    cont.style.display = "block";

    addBubble();
}

updateHighScore();