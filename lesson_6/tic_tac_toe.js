const readline = require('readline-sync');

const PLAYER_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const INITIAL_MARKER = ' ';

while (true) {
  let board = initialiseBoard();
  let winner = null;

  do {
    displayBoard(board);
    performPlayerMove(board);
    winner = getWinner(board);
    if (winner || isBoardFull(board)) break;

    performComputerMove(board);
    winner = getWinner(board);
    if (winner || isBoardFull(board)) break;
  } while (true);

  displayBoard(board);
  if (winner) {
    displayWinner(winner);
  } else if (isBoardFull(board)) {
    displayTie();
  }

  if (!playingAgain()) break;
}

prompt('Goodbye!');

/* Functions */

function prompt(message) {
  console.log(`=> ${message}`);
}

function initialiseBoard() {
  let board = {};
  for (let square = 1; square <= 9; square++) {
    board[square] = INITIAL_MARKER;
  }
  return board;
}

function displayBoard(board) {
  console.clear();
  console.log('');
  console.log('     |     |');
  console.log(`  ${board[1]}  |  ${board[2]}  |  ${board[3]}`);
  console.log('     |     |');
  console.log('-----|-----|-----');
  console.log('     |     |');
  console.log(`  ${board[4]}  |  ${board[5]}  |  ${board[6]}`);
  console.log('     |     |');
  console.log('-----|-----|-----');
  console.log('     |     |');
  console.log(`  ${board[7]}  |  ${board[8]}  |  ${board[9]}`);
  console.log('     |     |');
  console.log('');
}


function getPlayerMove(options) {
  prompt(`Choose a square (${joinOr(options)}):`);
  let response = readline.prompt().trim();
  return response;
}

function updateBoard(board, mark, square) {
  board[square] = mark;
}

function performPlayerMove(board) {
  let options = emptySquares(board);
  let square = getPlayerMove(options);
  while (!options.includes(square)) {
    prompt("Sorry, that's not a valid choice.");
    square = getPlayerMove(options);
  }
  updateBoard(board, PLAYER_MARKER, square);
}

function performComputerMove(board) {
  let options = emptySquares(board);
  let square = options[getRandomNumberBetween(0, options.length - 1)];
  updateBoard(board, COMPUTER_MARKER, square);
}

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// eslint-disable-next-line max-lines-per-function
function getWinner(board) {
  const winningLines = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9], //columns
    [1, 5, 9], [3, 5, 7] // diagonals
  ];

  for (let line = 0; line < winningLines.length; line++) {
    let [sq1, sq2, sq3] = winningLines[line];

    if (
      board[sq1] === PLAYER_MARKER &&
      board[sq2] === PLAYER_MARKER &&
      board[sq3] === PLAYER_MARKER
    ) {
      return PLAYER_MARKER;
    } else if (
      board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER
    ) {
      return COMPUTER_MARKER;
    }
  }

  return null;
}

function displayWinner(winner) {
  if (winner === PLAYER_MARKER) {
    console.log('You won!');
  } else if (winner === COMPUTER_MARKER) {
    console.log('The Computer won!');
  }
}

function emptySquares(board) {
  return Object.keys(board).filter(index => board[index] === INITIAL_MARKER);
}

function isBoardFull(board) {
  return emptySquares(board).length === 0;
}

function displayTie() {
  console.log("It's a tie!");
}

function playingAgain() {
  let response;
  do {
    prompt('Do you want to play again?');
    response = readline.prompt().toLowerCase();
  } while (!['yes', 'y', 'no', 'n'].includes(response));
  return ['yes', 'y'].includes(response);
}

function joinOr(list, delimiter = ', ', word = 'or') {
  const lastIdx = list.length - 1;
  switch (list.length) {
    case 0:
      return '';
    case 1:
      return String(list[0]);
    case 2:
      return list.join(` ${word} `);
    default:
      return list.slice(0, lastIdx).join(delimiter) +
             `${delimiter}${word} ${list[lastIdx]}`;
  }
}