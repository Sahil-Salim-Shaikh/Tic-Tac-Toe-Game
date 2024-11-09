let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector("#msg");

let turn0 = true; // True means it's the player's turn ('O')
let gameover = false; // Flag to track if the game is over

let winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to display winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations, the winner is ${winner}`;
    msgContainer.classList.remove("hide");
    gameover = true;
};

// Function to check for a winner or a draw
const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return;
        }
    }

    // Check if all boxes are filled, indicating a draw
    if (Array.from(boxes).every(box => box.innerText !== "")) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        gameover = true;
    }
};

// Function to find the best move for the computer
const findBestMove = (symbol) => {
    for (let pattern of winPattern) {
        let [a, b, c] = pattern;
        if (
            boxes[a].innerText === symbol &&
            boxes[b].innerText === symbol &&
            boxes[c].innerText === ""
        ) {
            return boxes[c];
        }
        if (
            boxes[a].innerText === symbol &&
            boxes[c].innerText === symbol &&
            boxes[b].innerText === ""
        ) {
            return boxes[b];
        }
        if (
            boxes[b].innerText === symbol &&
            boxes[c].innerText === symbol &&
            boxes[a].innerText === ""
        ) {
            return boxes[a];
        }
    }
    return null;
};

// Function for the computer's turn
const computerTurn = () => {
    if (gameover) return;

    // Check if the computer can win
    let bestMove = findBestMove('X');
    if (!bestMove) {
        // Check if the computer needs to block the player
        bestMove = findBestMove('O');
    }
    if (!bestMove) {
        // If no winning or blocking move, pick a random empty box
        let availableBoxes = Array.from(boxes).filter(box => box.innerText === "");
        bestMove = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
    }

    // Make the move
    bestMove.innerText = 'X';
    bestMove.disabled = true;
    checkWinner();
    turn0 = true; // Switch back to the player
};

// Event listener for each box (player's turn)
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameover || !turn0 || box.innerText !== "") return;

        box.innerText = 'O';
        box.disabled = true;
        checkWinner();
        
        turn0 = false;
        if (!gameover) {
            setTimeout(computerTurn, 500); // Slight delay for a natural feel
        }
    });
});

// Function to reset the game
const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    msgContainer.classList.add("hide");
    turn0 = true;
    gameover = false;
};

// Event listeners for Reset and New Game buttons
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
