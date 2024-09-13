function Gameboard() {
    const board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    return { board };
}

function addToBoard(game, cells, index) {
    if (index < 3) {
        game.gameboard.board[0][index] = cells[index].textContent;
    }
    else if (index < 6) {
        game.gameboard.board[1][index - 3] = cells[index].textContent;
    }
    else {
        game.gameboard.board[2][index - 6] = cells[index].textContent;
    }
}

function Player(name) {
    return { name };
}

function checkWin(board) {

    let winningCominations = [['X', 'X', 'X'], ['O', 'O', 'O']];
    let columns = [[board[0][0], board[1][0], board[2][0]], [board[0][1], board[1][1], board[2][1]], [board[0][2], board[1][2], board[2][2]]];
    let diagonals = [[board[0][0], board[1][1], board[2][2]], [board[0][2], board[1][1], board[2][0]]];
    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < board.length; i++) {
            if (JSON.stringify(winningCominations[j]) == JSON.stringify(board[i]) ||
                JSON.stringify(winningCominations[j]) == JSON.stringify(columns[i]) ||
                JSON.stringify(winningCominations[j]) == JSON.stringify(diagonals[i])) {
                return true;
            }
        }
    }
    return false;
}

function gameOver(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }

}

function setGame() {
    const gameboard = Gameboard();
    const player1 = Player(document.querySelector('#Player-1').value);
    const player2 = Player(document.querySelector('#Player-2').value);
    return { player1, player2, gameboard };
}


function TicTacToe() {
    const game = setGame();
    let currentPlayer = game.player1;

    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', () => {
            if (currentPlayer === game.player1) {
                cells[i].textContent = 'X';
                addToBoard(game, cells, i);
                if (checkWin(game.gameboard.board)) {
                    console.log(`${currentPlayer.name} wins!`);
                    gameOver(cells);
                }
                currentPlayer = game.player2;
            }
            else {
                cells[i].textContent = 'O';
                addToBoard(game, cells, i);
                if (checkWin(game.gameboard.board)) {
                    console.log(`${currentPlayer.name} wins!`);
                    gameOver(cells);
                }
                currentPlayer = game.player1;
            }
            cells[i].disabled = true;
        });
    }
}

const start = document.querySelector('#startGame');
start.addEventListener('click', () => {
    TicTacToe();
});