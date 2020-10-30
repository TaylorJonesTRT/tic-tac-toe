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
        let winner = null;
        let winLocation = checkForWinner();
        let winMarker = Gameboard.gameBoard[winLocation[0]];
        if (winMarker === "X") {
            winner = "X";
            return {score: -10}
        } else if (winMarker === "O") {
            winner = "O"
            return {score: +10}
        }
        let openSpots = 0;
        for (let i = 0; i < Gameboard.gameBoard.length; i++) {
            if (Gameboard.gameBoard[i] === "") {
                openSpots++;
            }
        }
        if (winner === null && openSpots === 0) {
            winner = "tie";
            return {score: 0}
        } else {
           return winner;
        }

        return winner;
    }
    
    let turn = 1;
    const whosTurn = () => {
        return (turn % 2 === 0) ? player2 : player1;
    }
    // Player move
    // const move = (e) => {
    //     if (!gameOver){}
    //     let activePlayer = whosTurn();
    //     if (activePlayer === player1) {
    //         if (e.target.innerText === "") {
    //             Gameboard.updateBoard(e.target.getAttribute("data-value"), player1.symbol)
    //             console.log(e.target.value);
    //             console.log(player1.symbol);
    //             Gameboard.boardRender();
    //             checkForWinner();
    //             if (winningCombo.length !== 0) {
    //                 console.log(winningPlayer().name);
    //                 Display.updateWinnerDiv(winningPlayer());
    //             }
    //             turn++;
    //         }
    //     } else if (activePlayer === player2) {
    //         bestMove();
    //     }
    // }

    const moves = (e) => {
        let activePlayer = whosTurn();
        if (activePlayer === player1) {
            if (e.target.innerText === "") {
                Gameboard.updateBoard(e.target.getAttribute("data-value"), activePlayer.symbol)
                console.log(player1.symbol);
                Gameboard.boardRender();
                turn++;
            }
        } else if (activePlayer === player2) {
            bestMove()
            Gameboard.boardRender();
            turn++;
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

    const updateWinner = () => {
        if (winningPlayer() === "X") {
            winner = player1;
        } else if (winningPlayer() === "O") {
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

    function bestMove() {
        let bestScore = -Infinity;
        let activeplayer = whosTurn();
        let move;
        for (let i = 0; i < 9; i++) {
            if (Gameboard.boardTiles[i].innerText === "") {
                Gameboard.updateBoard(i, player1.symbol);
                let score = minimax(Gameboard.boardTiles, 0, false);
                Gameboard.updateBoard(i, "");
                if (score > bestScore) {
                    bestScore = score;
                    move = i
                    // console.log(move);
                }
            }
        }
        Gameboard.updateBoard(move, player2.symbol);
        Gameboard.boardRender();
        return move;
    }
    let scores = {
        O: 100,
        x: -100,
        tie: 0
    }

    console.log(winningPlayer());

    function minimax(board, depth, isMaximizing) {
        let result = winningPlayer();
        if (result !== null) {
            return scores[result];
        }
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    Gameboard.updateBoard(i, player2.symbol);
                    let score = minimax(Gameboard.gameBoard, depth + 1, true);
                    bestScore = Math.max(score, bestScore);
                    Gameboard.updateBoard(i, "");
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    Gameboard.updateBoard(i, player1.symbol);
                    let score = minimax(Gameboard.gameBoard, depth + 1, true);
                    bestScore = Math.min(score, bestScore);
                    Gameboard.updateBoard(i, "");
                }
            }
            return bestScore;
        }
    }
    console.log(minimax(Gameboard.gameBoard, 0, false));

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

