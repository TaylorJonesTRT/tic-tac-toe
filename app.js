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
            winningCombo = [0, 1, 2];
            gameOver = true;
            return [0,1,2];
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
            return false;
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
                turn++;
            }
        } else if (activePlayer === player2) {
            bestMove();
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
        turn = 1;
    }

    addEvents();
    let playableCells = [];
    function emptyCells() {
        for (let i = 0; i < Gameboard.gameBoard.length; i++) {
            if (Gameboard.gameBoard[i] === "") {
                playableCells.push(i);
            }
        }
        return playableCells;
    }
    function bestMove() {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 9; i++) {
            if (Gameboard.gameBoard[i] === "") {
                Gameboard.gameBoard[i] = player2.symbol;
                let score = minimax(Gameboard.gameBoard, 0, false);
                Gameboard.gameBoard[i] = "";
                console.log(score);
                if (score > bestScore) {
                    bestScore = score;
                    console.log(i);
                    move = i
                }
            }
        }
        Gameboard.updateBoard(move, player2.symbol);
        Gameboard.boardRender();
        return move;
    }

    const scores = {
        X: -1,
        O: 1,
        tie: 0
    }

    function minimax(board, depth, isMaximizing) {
        let result = winningPlayer();
        if (result !== null) {
            let score = scores[result];
            return score
        }        
        
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    Gameboard.gameBoard[i] =  player2.symbol;
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
                    Gameboard.gameBoard[i] = player1.symbol;
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
    console.log(minimax(Gameboard.gameBoard, 0, false));

    return {removeEvents, winningPlayer, updateWinner, resetGame, minimax}
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





const bestMove = () => {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++ ) {
            if (!gameBoard.boardArray[i][j]) {
                gameBoard.boardArray[i][j] = player2.getTeam();
                let score = minimax(gameBoard.boardArray, 0, false);
                gameBoard.boardArray[i][j] = ''
                if (score > bestScore) {
                    bestScore = score;
                    move = {i , j};
                }
            }
        }
    }
    gameBoard.boardArray[move.i][move.j] = player2.getTeam();
    gameBoard.clearBoard();
    gameBoard.displayBoard();
    /* if (currentPlayer == player1) {
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    } */
    turnCount += 1;
    if (checkForWin()[0] != null) {
        gameOver = true;
        const result = document.querySelector("#result");
        if (checkForWin()[0] != 'tie'){
            result.textContent = checkForWin()[0] + " WINS!!";
            
            body.classList.add("animate");
            drawLine(checkForWin()[1]);
            touch.currentTime = 1.3;
            touch.play();
        } else {
            result.textContent = "Cat's game. Try again."
            cat.currentTime = 0;
            cat.play();
        }
       
        
        
    }
    if (!gameOver){
    takeTurn();
    }
    
}

const scores = {
    X: -1,
    O: 1,
    tie: 0
};

const minimax = (board, depth, isMaximizing) => {
    let result = checkForWin()[0];
    if (result !== null) {
        let score = scores[result];
        return score
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++ ) {
                if (!gameBoard.boardArray[i][j]) {
                    gameBoard.boardArray[i][j] = player2.getTeam();
                    let score = minimax(board, depth + 1, false);
                    gameBoard.boardArray[i][j] = '';
                    if (score > bestScore) {
                        bestScore = score;
                    }
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++ ) {
                if (!gameBoard.boardArray[i][j]) {
                    /* if (currentPlayer == player1) {
                        currentPlayer = player2;
                    } else {
                        currentPlayer = player1;
                    } */
                    gameBoard.boardArray[i][j] = player1.getTeam();
                    let score = minimax(board, depth + 1, true);
                    gameBoard.boardArray[i][j] = '';
                    if ( score < bestScore) {
                        bestScore = score;
                    }
                }
            }
        }
        return bestScore;
    }
}