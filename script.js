const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");
const popup = document.getElementById("popup");
const popupContent = document.querySelector(".popup-content");
const resetPopupButton = document.getElementById("reset-button");
const winnerText = document.getElementById("winner");

let currentPlayer = "X";
let gameOver = false;

// Event listener for cell clicks
cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (!cell.textContent && !gameOver) {
            cell.textContent = currentPlayer;
            if (checkWinner(currentPlayer)) {
                gameOver = true;
                winnerText.textContent = `Winner: ${currentPlayer}`;
                popup.style.display = "block";
            } else if ([...cells].every((cell) => cell.textContent !== "")) {
                gameOver = true;
                winnerText.textContent = "It's a draw!";
                popup.style.display = "block";
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    });
});

// Event listener for reset button
resetButton.addEventListener("click", () => {
    cells.forEach((cell) => (cell.textContent = ""));
    currentPlayer = "X";
    gameOver = false;
    popup.style.display = "none";
});

// Event listener for play again button in popup
resetPopupButton.addEventListener("click", () => {
    resetButton.click();
});

// Function to check for a winner
function checkWinner(player) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winPatterns.some((pattern) =>
        pattern.every((index) => cells[index].textContent === player)
    );
}
