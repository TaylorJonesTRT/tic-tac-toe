const Gameboard = (() => {
    // DOM
    const boardTiles = document.querySelectorAll(".box");

    // Gameboard
    const gameBoard = ["","","",
                       "","","",
                       "","",""];

    const updateBoard = (cell, symbol) => gameBoard[cell] = symbol;

    const resetGame = () => {
        boardTiles.forEach((tile) => {
            Game.removeEvents();
            tile.innerText = "";
            Game.winningCombo = [];
        })
    }

    return {gameBoard, boardRender, updateBoard, boardTiles, resetGame}
})();

// Player Module
const Player = (name, symbol) => {
    return {name, symbol}
}

// Game functionality
const Game = (() => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");

    let winningCombo = [];
    const checkForWinner = () => {
        if (Gameboard.gameBoard[0] === Gameboard.gameBoard[1] && Gameboard.gameBoard[0] === Gameboard.gameBoard[2] && Gameboard.gameBoard[0] !== "") {
            winningCombo = [1, 2, 3];
            return [1, 2, 3];
        } else if (Gameboard.gameBoard[3] === Gameboard.gameBoard[4] && Gameboard.gameBoard[3] === Gameboard.gameBoard[5] && Gameboard.gameBoard[3] !== ""){
            winningCombo = [3, 4, 5];
            return [3, 4, 5];
        } else if (Gameboard.gameBoard[6] === Gameboard.gameBoard[7] && Gameboard.gameBoard[6] === Gameboard.gameBoard[8] && Gameboard.gameBoard[6] !== "") {
            winningCombo = [6, 7, 8];
            return [6, 7, 8];
        } else if (Gameboard.gameBoard[0] === Gameboard.gameBoard[4] && Gameboard.gameBoard[0] === Gameboard.gameBoard[8] && Gameboard.gameBoard[0] !== ""){
            winningCombo = [0, 4, 8];
            return [0, 4, 8];
        } else if (Gameboard.gameBoard[2] === Gameboard.gameBoard[4] && Gameboard.gameBoard[2] === Gameboard.gameBoard[6] && Gameboard.gameBoard[2] !== ""){
            winningCombo = [2, 4, 6];
            return [2, 4, 6];
        } else if (Gameboard.gameBoard[0] === Gameboard.gameBoard[3] && Gameboard.gameBoard[0] === Gameboard.gameBoard[6] && Gameboard.gameBoard[0] !== "") {
            winningCombo = [0, 3, 6];
            return [0, 3, 6];
        } else if (Gameboard.gameBoard[1] === Gameboard.gameBoard[4] && Gameboard.gameBoard[1] === Gameboard.gameBoard[7] && Gameboard.gameBoard[1] !== "") {
            winningCombo = [1, 4, 7];
            return [1, 4, 7];
        } else if (Gameboard.gameBoard[2] === Gameboard.gameBoard[5] && Gameboard.gameBoard[2] === Gameboard.gameBoard[8] && Gameboard.gameBoard[2] !== "") {
            winningCombo = [2, 5, 8];
            return [2, 5, 8];
        } else {
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
    
    let winner;
    const updateWinner = (player, symbol) => {
        winner = winningPlayer;
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
        let activePlayer = whosTurn();
        if (e.target.innerText === "") {
            Gameboard.updateBoard(e.target.getAttribute("data-value"), activePlayer.symbol)
            console.log(e.target.value);
            console.log(activePlayer.symbol);
            Gameboard.boardRender();
            checkForWinner();
            if (winningCombo.length !== 0) {
                winningPlayer;
                console.log(winningPlayer().name);
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
    addEvents();

    return {removeEvents, winningCombo}
})();

const Display = (() => {
    //Cahing DOM Elements

    //Updating DOM Elements

})();