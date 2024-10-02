let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#res-btn");
let restartBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
// let startbtnX = document.getElementById("startX");
// let valueX = startbtnX.innerHTML;
// let startbtnO = document.getElementById("startO");
// let valueO = startbtnO.innerHTML;

// const start = () => {
//     if(valueO === "O"){
//         turnO = true;
//     }
//     else{
//         turnO = false;
//     }
// };

// startbtnO.addEventListener("click", start);

turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");     
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, The winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let valAtpos1 = boxes[pattern[0]].innerText;
        let valAtpos2 = boxes[pattern[1]].innerText;
        let valAtpos3 = boxes[pattern[2]].innerText;

        if(valAtpos1 != "" && valAtpos2 != "" && valAtpos3 != "") {
            if(valAtpos1 === valAtpos2 && valAtpos2 === valAtpos3) {
                showWinner(valAtpos1);
                return true;
            }
        }      
    }
};

resetBtn.addEventListener("click", resetGame);
restartBtn.addEventListener("click", resetGame);