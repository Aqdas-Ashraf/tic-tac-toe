let reset = document.querySelector(".reset");
let newgame = document.querySelector(".new-game");
let boxes = document.querySelectorAll(".box");
let msg = document.querySelector(".msg-container");
const audio1 = document.getElementById("myAudio1");
audio1.volume = 0.2;
audio1.play();


// document.body.style.overflowY = 'hidden';


function playMusic2() {
    let audio2 = document.getElementById("myAudio2");
    audio2.play();
}

function playMusic3(){
    let audio3 = document.getElementById("myAudio3");
    audio3.play();
}

let currentRound = 0; // Current round tracker
let maxRounds = 5;    // Total number of rounds
let xScore = 0;       // X player score
let oScore = 0;       // O player score

const updateRoundAndScore = () => {
    document.getElementById("round").innerText = `Round: ${currentRound}/5`;
    document.getElementById("x-score").innerText = `${xScore}`;
    document.getElementById("o-score").innerText = `${oScore}`;
};

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

let turnO = true;
document.addEventListener("DOMContentLoaded", () => {
    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            console.log("box was clicked !!");

            if (turnO) {
                box.innerHTML = "X";
                box.classList.add("X");
            } else {
                box.innerHTML = "O";
                box.classList.add("O");
            }
            turnO = !turnO;
            box.disabled = true;

            if (!checkwinner()) {
                checkdraw();
            }
        });
    });
});

const disableBtn = () => {
    for (const box of boxes) {
        box.disabled = true;
    }
};

const enableBtn = () => {
    for (const box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showwinner = (winner) => {
    msg.classList.remove("hide");
    msg.classList.add("winner");
    playMusic3();
    currentRound++;
    if(currentRound < maxRounds){
    document.querySelector("#winner").innerHTML = `Round-${currentRound} winner is ${winner}`;
    if (winner === "X") {
        xScore++;
    } else if (winner === "O"){
        oScore++;
    }
    updateRoundAndScore();
    // Start confetti effect for a round win
    startConfetti();
    // Check if max rounds are completed
}
    else{
        if (xScore > oScore){
            msg.classList.remove("hide");
            msg.classList.add("winner");
            document.querySelector("#winner").innerHTML = `Final winner is X`;
        } else if (oScore > xScore){
            msg.classList.remove("hide");
            msg.classList.add("winner");
           document.querySelector("#winner").innerHTML = `Final winner is O`;
        } else{
            msg.classList.remove("hide");
            msg.classList.add("winner");
            document.querySelector("#winner").innerHTML = `No winner overall!`;
        }
         resetGame1();
    }
};

// Define the resetGame function to reset scores and rounds for a new set of games
const resetGame = () => {
    xScore = 0;
    oScore = 0;
    currentRound = 0;
    updateRoundAndScore();
    enableBtn();
    msg.classList.add("hide");
};

const resetGame1 = () => {
    xScore = 0;
    oScore = 0;
    currentRound = 0;
    updateRoundAndScore();
    disableBtn();
}

// Trigger confetti
function startConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
}

const showdraw = () => {
    document.querySelector("#winner").innerHTML = "Game is Draw !!";
    msg.classList.remove("hide");
    msg.classList.add("draw");
    disableBtn();
};

const Reset = () => {
    turnO = true;
    enableBtn();
    msg.classList.add("hide");
};

const checkwinner = () => {
    for (const pattern of winPattern) {
        let posi1 = boxes[pattern[0]].innerText;
        let posi2 = boxes[pattern[1]].innerText;
        let posi3 = boxes[pattern[2]].innerText;
        if (posi1 !== "" && posi2 !== "" && posi3 !== "") {
            if (posi1 === posi2 && posi2 === posi3) {
                showwinner(posi1);
                return true;
            }
        }
    }
    return false;
};

const checkdraw = () => {
    let filled = true;
    boxes.forEach((box) => {
        if (box.innerHTML === "") {
            filled = false;
        }
    });
    if (filled) {
        showdraw();
    }
};

reset.addEventListener("click", resetGame);
newgame.addEventListener("click", Reset);