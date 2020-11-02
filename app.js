const Gameboard = (() => {
    // DOM
    const boardTiles = document.querySelectorAll(".box");

    // Gameboard
    const gameBoard = ["","","",
                       "","","",
                       "","",""];

    // Board functions
    const boardRender = function() {
        for (let i = 0; i < gameBoard.length; i++) {
        boardTiles[i].textContent = gameBoard[i]
        }
    }
    const updateBoard = (cell, symbol) => gameBoard[cell] = symbol;

    return {gameBoard, boardRender, updateBoard, boardTiles}
})();

// Player Module
const Player = (name, symbol) => {
    return {name, symbol}
}

// Game functionality
const Game = (() => {
    const player1 = Player("Player", "X");
    const player2 = Player("Computer", "O");

    const checkForWinner = () => {
        if (Gameboard.gameBoard[0] === Gameboard.gameBoard[1] && Gameboard.gameBoard[0] === Gameboard.gameBoard[2] && Gameboard.gameBoard[0] !== "") {
            return [0,1,2];
        } else if (Gameboard.gameBoard[3] === Gameboard.gameBoard[4] && Gameboard.gameBoard[3] === Gameboard.gameBoard[5] && Gameboard.gameBoard[3] !== ""){
            return [3, 4, 5];
        } else if (Gameboard.gameBoard[6] === Gameboard.gameBoard[7] && Gameboard.gameBoard[6] === Gameboard.gameBoard[8] && Gameboard.gameBoard[6] !== "") {
            return [6, 7, 8];
        } else if (Gameboard.gameBoard[0] === Gameboard.gameBoard[4] && Gameboard.gameBoard[0] === Gameboard.gameBoard[8] && Gameboard.gameBoard[0] !== ""){
            return [0, 4, 8];
        } else if (Gameboard.gameBoard[2] === Gameboard.gameBoard[4] && Gameboard.gameBoard[2] === Gameboard.gameBoard[6] && Gameboard.gameBoard[2] !== ""){
            return [2, 4, 6];
        } else if (Gameboard.gameBoard[0] === Gameboard.gameBoard[3] && Gameboard.gameBoard[0] === Gameboard.gameBoard[6] && Gameboard.gameBoard[0] !== "") {
            return [0, 3, 6];
        } else if (Gameboard.gameBoard[1] === Gameboard.gameBoard[4] && Gameboard.gameBoard[1] === Gameboard.gameBoard[7] && Gameboard.gameBoard[1] !== "") {
            return [1, 4, 7];
        } else if (Gameboard.gameBoard[2] === Gameboard.gameBoard[5] && Gameboard.gameBoard[2] === Gameboard.gameBoard[8] && Gameboard.gameBoard[2] !== "") {
            return [2, 5, 8];
        } else {
            return false;
        }        
    }

    const winningPlayer = function() {
        let winner = null;
        let winLocation = checkForWinner();
        let winMarker = Gameboard.gameBoard[winLocation[0]];
        if (winMarker === "X") {
            winner = "X";
        } else if (winMarker === "O") {
            winner = "O"
        }
        let openSpots = 0;
        for (let i = 0; i < Gameboard.gameBoard.length; i++) {
            if (Gameboard.gameBoard[i] === "") {
                openSpots++;
            }
        }
        if (winner === null && openSpots === 0) {
            winner = "tie";
            return winner;
        } else {
           return winner;
        }
    }

    const gameOverLogic = function() {
        if (winningPlayer() === "X") {
            Display.updateWinnerDiv(player1);
        } else if (winningPlayer() === "O") {
            Display.updateWinnerDiv(player2);
        }
    }
    
    let turn = 1;
    const whosTurn = () => {
        return (turn % 2 === 0) ? player2 : player1;
    }

    const moves = (e) => {
        let activePlayer = whosTurn();
        if (activePlayer === player1) {
            if (e.target.innerText === "") {
                Gameboard.updateBoard(e.target.getAttribute("data-value"), activePlayer.symbol)
                console.log(player1.symbol);
                Gameboard.boardRender();
                console.log(checkForWinner());
                turn++;
                setTimeout(Ai.bestMove, 1500);
                console.log(checkForWinner());
                turn++;
            }
        }
    }
    

    const removeEvents = () => {
        Gameboard.boardTiles.forEach((tile) => {
            tile.removeEventListener('click', moves);
        });
    }
    function addEvents() {
        Gameboard.boardTiles.forEach((tile) => {
            tile.addEventListener('click', moves);
        })
    }

    const resetGame = () => {
        removeEvents();
        for (let y = 0; y <= 8; y++) {
            Gameboard.gameBoard[y] = "";
        }
        winner = "";
        Gameboard.boardRender();
        addEvents();
        Display.updateWinnerDiv("reset");
        turn = 1;
    }

    addEvents();

    return {removeEvents, winningPlayer, resetGame, player1, player2}
})();

const Display = (() => {
    // DOM Elements
    winnerResultDiv = document.querySelector(".winner-result");
    resetBtn = document.querySelector(".reset-btn");

    // Events
    resetBtn.addEventListener('click', Game.resetGame);

    // Updating DOM Elements
    const updateWinnerDiv = (player) => {
        winnerResultDiv.innerText = player.name;

        if (player === "tie") {
            winnerResultDiv.innerText = "Tie!";
        }

        if (player === "reset") {
            winnerResultDiv.innerText = "";
        }
    }

    return {updateWinnerDiv}
})();


const Ai = (() => {
    function bestMove() {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 9; i++) {
            if (Gameboard.gameBoard[i] === "") {
                Gameboard.gameBoard[i] = Game.player2.symbol;
                let score = minimax(Gameboard.gameBoard, 0, false);
                Gameboard.gameBoard[i] = "";
                if (score > bestScore) {
                    bestScore = score;
                    move = i
                }
            }
        }
        Gameboard.updateBoard(move, Game.player2.symbol);
        Gameboard.boardRender();
        return move;
    }

    const scores = {
        X: -1,
        O: 1,
        tie: 0
    }

    function minimax(board, depth, isMaximizing) {
        let result = Game.winningPlayer();
        if (result !== null) {
            let score = scores[result];
            return score
        }        
        
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    Gameboard.gameBoard[i] =  Game.player2.symbol;
                    let score = minimax(Gameboard.gameBoard, depth + 1, false);
                    Gameboard.gameBoard[i] = "";
                    if (score > bestScore) {
                        bestScore = score;
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    Gameboard.gameBoard[i] = Game.player1.symbol;
                    let score = minimax(Gameboard.gameBoard, depth + 1, true);
                    Gameboard.gameBoard[i] = "";
                    if (score < bestScore) {
                        bestScore = score;
                    }
                }
            }
            return bestScore;
        }
    }

    return {bestMove}
})();


// TODO: Need to refactor the way the game moves, right now the player has to click for the ai to play, need to fix that
// TODO: Need to refactor the code block that determines who the win is assigned to
// TODO: Need to fix the announcement of the winner in the Display module (currently not showing the announcement if a tie has happened, only if one of the player or the computer wins)
// TODO: Need to clean up the private/public functions and what is returned and naming scheme of functions