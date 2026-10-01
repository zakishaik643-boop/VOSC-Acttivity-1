/* ==========================================================================
   VOSC Activity 1 – Tic-Tac-Toe Game Logic
   ========================================================================== */

// --- Game State Variables ---
let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// --- Winning Combinations (Rows, Columns, Diagonals) ---
const winningConditions = [
    [0, 1, 2], // Top Row
    [3, 4, 5], // Middle Row
    [6, 7, 8], // Bottom Row
    [0, 3, 6], // Left Column
    [1, 4, 7], // Middle Column
    [2, 5, 8], // Right Column
    [0, 4, 8], // Diagonal (Top-Left to Bottom-Right)
    [2, 4, 6]  // Diagonal (Top-Right to Bottom-Left)
];

// --- DOM Element References ---
const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restart-btn");

// --- Functions ---

/**
 * Handles cell click event.
 * Checks if the cell is valid to play, updates UI, and checks for win/draw.
 */
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));

    // Prevent click if cell is already occupied or game is over
    if (boardState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // Process player move
    updateCell(clickedCell, clickedCellIndex);
    checkResult();
}

/**
 * Updates internal board state array and cell visual styling.
 */
function updateCell(cell, index) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
}

/**
 * Switches current player between 'X' and 'O' and updates status text.
 */
function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    const playerClass = currentPlayer.toLowerCase();
    statusDisplay.innerHTML = `Player <span class="player-${playerClass}">${currentPlayer}</span>'s Turn`;
}

/**
 * Evaluates current board state against winning conditions and draw state.
 */
function checkResult() {
    let roundWon = false;
    let winningCombination = [];

    // Check all winning lines
    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const cellA = boardState[condition[0]];
        const cellB = boardState[condition[1]];
        const cellC = boardState[condition[2]];

        // Skip check if any cell in combination is empty
        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }

        // Check if all three match
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            winningCombination = condition;
            break;
        }
    }

    // Handle Win
    if (roundWon) {
        const winnerClass = currentPlayer.toLowerCase();
        statusDisplay.innerHTML = `🎉 Player <span class="player-${winnerClass}">${currentPlayer}</span> Wins!`;
        gameActive = false;
        highlightWinningCells(winningCombination);
        return;
    }

    // Handle Draw (no empty cells left)
    const roundDraw = !boardState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = `🤝 It's a Draw!`;
        gameActive = false;
        return;
    }

    // Continue game - switch turn
    switchPlayer();
}

/**
 * Visually highlights the three winning cells.
 */
function highlightWinningCells(combination) {
    combination.forEach(index => {
        cells[index].classList.add("winning-cell");
    });
}

/**
 * Resets the entire game state and UI board.
 */
function restartGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    // Reset status message
    statusDisplay.innerHTML = `Player <span class="player-x">X</span>'s Turn`;

    // Clear cell content and styling classes
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o", "winning-cell");
    });
}

// --- Event Listeners ---
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);
