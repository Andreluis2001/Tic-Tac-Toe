function Gameboard() {
    const board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    return { board };
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

function TicTacToe() {
    const gameboard = Gameboard();
    const player1 = Player("Player 1");
    const player2 = Player("Player 2");
    let gameOver = false;
    let timesPlayed = 0;
    while (!gameOver && timesPlayed < 9) {
        if (checkWin(gameboard.board)) {
            console.log(`${currentPlayer.name} wins!`);
            gameOver = true;
        }
        timesPlayed++;
    }
    return {player1, player2, gameboard};
}

const game = TicTacToe();
let currentPlayer = game.player1;

const cells = document.querySelectorAll('.cell');
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', () => {
        if(currentPlayer === game.player1){
            cells[i].textContent = 'X';
            currentPlayer = game.player2;
        }
        else{
            cells[i].textContent = 'O';
            currentPlayer = game.player1;
        }
        cells[i].disabled = true;
    });
}