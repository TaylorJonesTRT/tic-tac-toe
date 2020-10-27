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
    // DOM Elements
    const player1 = Player("Player", "X");
    const player2 = Player("Computer", "O");

    let winningCombo = [];
    let gameOver = false;
    const checkForWinner = () => {
        if (Gameboard.gameBoard[0] === Gameboard.gameBoard[1] && Gameboard.gameBoard[0] === Gameboard.gameBoard[2] && Gameboard.gameBoard[0] !== "") {
            winningCombo = [1, 2, 3];
            gameOver = true;
            return [1, 2, 3];
        } else if (Gameboard.gameBoard[3] === Gameboard.gameBoard[4] && Gameboard.gameBoard[3] === Gameboard.gameBoard[5] && Gameboard.gameBoard[3] !== ""){
            winningCombo = [3, 4, 5];
            gameOver = true;
            return [3, 4, 5];
        } else if (Gameboard.gameBoard[6] === Gameboard.gameBoard[7] && Gameboard.gameBoard[6] === Gameboard.gameBoard[8] && Gameboard.gameBoard[6] !== "") {
            winningCombo = [6, 7, 8];
            gameOver = true;
            return [6, 7, 8];
        } else if (Gameboard.gameBoard[0] === Gameboard.gameBoard[4] && Gameboard.gameBoard[0] === Gameboard.gameBoard[8] && Gameboard.gameBoard[0] !== ""){
            winningCombo = [0, 4, 8];
            gameOver = true;
            return [0, 4, 8];
        } else if (Gameboard.gameBoard[2] === Gameboard.gameBoard[4] && Gameboard.gameBoard[2] === Gameboard.gameBoard[6] && Gameboard.gameBoard[2] !== ""){
            winningCombo = [2, 4, 6];
            gameOver = true;
            return [2, 4, 6];
        } else if (Gameboard.gameBoard[0] === Gameboard.gameBoard[3] && Gameboard.gameBoard[0] === Gameboard.gameBoard[6] && Gameboard.gameBoard[0] !== "") {
            winningCombo = [0, 3, 6];
            gameOver = true;
            return [0, 3, 6];
        } else if (Gameboard.gameBoard[1] === Gameboard.gameBoard[4] && Gameboard.gameBoard[1] === Gameboard.gameBoard[7] && Gameboard.gameBoard[1] !== "") {
            winningCombo = [1, 4, 7];
            gameOver = true;
            return [1, 4, 7];
        } else if (Gameboard.gameBoard[2] === Gameboard.gameBoard[5] && Gameboard.gameBoard[2] === Gameboard.gameBoard[8] && Gameboard.gameBoard[2] !== "") {
            winningCombo = [2, 5, 8];
            gameOver = true;
            return [2, 5, 8];
        } else {
            gameOver = false;
            return [];
        }        
}

    const checkTie = function() {
        if (board.includes("")) {
            return false;
        } else if (!findWinner()){
            return true;
        }
    }

    const winningPlayer = function() {
        let winLocation = checkForWinner();
        let winMarker = Gameboard.gameBoard[winLocation[0]];
        if (winMarker === "X") {
            return player1;
        } else if (winMarker === "O") {
            return player2;
        }
        removeEvents();
    }
    
    let turn = 1;
    const whosTurn = () => {
        return (turn % 2 === 0) ? player2 : player1;
    }
    // Player move
    const move = (e) => {
        if (!gameOver){}
        let activePlayer = whosTurn();
        if (e.target.innerText === "") {
            Gameboard.updateBoard(e.target.getAttribute("data-value"), activePlayer.symbol)
            console.log(e.target.value);
            console.log(activePlayer.symbol);
            Gameboard.boardRender();
            checkForWinner();
            if (winningCombo.length !== 0) {
                console.log(winningPlayer().name);
                Display.updateWinnerDiv(winningPlayer());
            } else {
                turn++;
            }
        } else if (e.target.innerText !== "") {
            alert("Sorry, you cannot play there");
        }
    }

    const removeEvents = () => {
        Gameboard.boardTiles.forEach((tile) => {
            tile.removeEventListener('click', move);
        });
    }
    function addEvents() {
        Gameboard.boardTiles.forEach((tile) => {
            tile.addEventListener('click', move);
        })
    }

    const updateWinner = () => {
        if (checkForWinner === player1) {
            winner = player1;
        } else if (checkForWinner === player2) {
            winner = player2;
        }
    }

    const resetGame = () => {
        removeEvents();
        for (let y = 0; y <= 8; y++) {
            Gameboard.gameBoard[y] = "";
        }
        winningCombo = [];
        winner = "";
        Gameboard.boardRender();
        addEvents();
        Display.updateWinnerDiv("reset");
    }

    addEvents();

    return {removeEvents, winningPlayer, updateWinner, resetGame}
})();

const Display = (() => {
    // DOM Elements
    winnerResultDiv = document.querySelector(".winner-result");
    resetBtn = document.querySelector(".reset-btn");

    // Events
    resetBtn.addEventListener('click', Game.resetGame);

    // Updating DOM Elements
    const updateWinnerDiv = (player) => {
        winnerResultDiv.innerText = player.name
        if (player === "reset") {
            winnerResultDiv.innerText = "";
        }
    }

    return {updateWinnerDiv}
})();