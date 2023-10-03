let colors = ["white", "blue", "red", "green", "yellow"];
let cont = document.getElementsByClassName("container")[0];
let level = 2000;
let curScore = 0, highScore = 0;
let missed = 0

function rColor() {
    return colors[Math.floor(Math.random() * 5)];
}

function gameOver() {
    highScore = Math.max(highScore, curScore);
    cont.style.display = "flex";
    document.getElementsByClassName("game-over")[0].style.display = "flex";
    document.querySelector("#high-score span").innerText = highScore;
}

function updateScore() {
    curScore++;
    document.querySelector("#score span").innerText = curScore;
}

function popBubble(evnt) {
    console.log(evnt.target);
    evnt.target.remove();
    level -= 50;
    updateScore();
}

function addBubble() {
    if (missed === 10) {
        gameOver();
        return;
    }
    let newDiv = document.createElement("div");
    newDiv.classList.add("bubble");
    newDiv.style.backgroundColor = rColor();
    newDiv.style.left = `${Math.floor(Math.random() * 900)}px`;
    cont.appendChild(newDiv);
    newDiv.addEventListener("mouseenter", (evnt) => {
        popBubble(evnt);
        addBubble();
    });
    newDiv.addEventListener("animationend", () => {
        newDiv.remove();
        missed++;
        document.querySelector("#missed span").innerText = missed;
        addBubble();
    });
}

function start() {
    level = 2000;
    curScore = 0;
    missed = 0;
    cont.style.display = "block";
    document.getElementsByClassName("game-over")[0].style.display = "none";
    document.querySelector("#score span").innerText = curScore;
    document.querySelector("#missed span").innerText = missed;
    cont.style.display = "block";
    addBubble();
}