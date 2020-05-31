const readline = require('readline-sync');

const PLAYER = 'X';
const COMPUTER = 'O';

let playing = true;

while (playing) {
  let playingRound = true;
  let board = initialiseBoard();
  displayBoard(board);
  do {
    performPlayerMove(board);
    performComputerMove(board);
    displayBoard(board);
    if (isWinningBoard(board)) {
      displayWinner();
      playingRound = false;
    } else if (isBoardFull(board)) {
      displayTie();
      playingRound = false;
    }
  } while (playingRound);
  if (!playAgain()) playing = false;
}

prompt('Goodbye!');

function prompt(message) {
  console.log(`=> ${message}`);
}

function initialiseBoard() {
  return [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];
}

function displayBoard(board) {
  board.forEach(row => {
    console.log(row.join('|'));
  });
}

function performPlayerMove(board) {
  let x ,y;
  do {
    [x, y] = getPlayerMove();
  } while (!isValidMove(board, x, y));
  updateBoard(board, 'X', x, y);
}

function getPlayerMove() {
  prompt('Where would you like to make your move?');
  let response = readline.prompt();
  let [x, y] = response.split(' ');
  return [Number(x), Number(y)];
}

function isValidMove(board, x, y) {
  return board[y][x] === ' ';
}

function updateBoard(board, mark, x, y) {
  board[y][x] = mark;
}

function performComputerMove(board) {
  if (isBoardFull(board)) return;
  let x, y;
  do  {
    x = getRandomNumberBetween(0, board[0].length - 1);
    y = getRandomNumberBetween(0, board.length - 1);
  } while (!isValidMove(board, x, y));
  updateBoard(board, 'O', x, y);
}

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isWinningBoard(board) {
  return hasWinningRow(board) || hasWinningColumn(board)
    || hasWinningDiagonal(board);
}

function hasWinningRow(board) {
  for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
    let row = board[0];
    let rowMatching = true;
    for (let colIdx = 1; colIdx < row.length; colIdx++) {
      if (row[colIdx] !== row[colIdx - 1]) rowMatching = false;
    }
    if (rowMatching && row[0] !== ' ') {
      return true;
    }
  }
  return false;
}

function hasWinningColumn(board) {
  for (let colIdx = 0; colIdx < board[0].length; colIdx++) {
    let colMatching = true;
    for (let rowIdx = 1; rowIdx < board.length; rowIdx++) {
      if (board[rowIdx][colIdx] !== board[rowIdx - 1][colIdx]) {
        colMatching = false;
      }
    }
    if (colMatching && board[0][colIdx] !== ' ') {
      return true;
    }
  }
  return false;
}

function hasWinningDiagonal(board) {
  return (board[0][0] === 'X' && board[0][0] === board[1][1]
    && board[1][1] === board[2][2]) ||
    (board[0][2] === 'X' &&  board[0][2] === board[1][1]
    && board[1][1] === board[2][0]);
}

function displayWinner() {
  console.log('You won!');
}

function isBoardFull(board) {
  return board.every(row => row.every(mark => mark !== ' '));
}

function displayTie() {
  console.log("It's a tie!");
}

function playAgain() {
  let response;
  do {
    prompt('Do you want to play again?');
    response = readline.prompt().toLowerCase();
  } while (!['yes', 'y', 'no', 'n'].includes(response));
  return ['yes', 'y'].includes(response);
}
