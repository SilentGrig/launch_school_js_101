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
    let winner = getWinner(board);
    if (winner) {
      displayWinner(winner);
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
  return [undefined, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
}

function displayBoard(board) {
  console.clear();
  console.log('     |     |');
  console.log('  ' + board[1] + '  |  ' + board[2] + '  |  ' + board[3]);
  console.log('     |     |');
  console.log('-----|-----|-----');
  console.log('     |     |');
  console.log('  ' + board[4] + '  |  ' + board[5] + '  |  ' + board[6]);
  console.log('     |     |');
  console.log('-----|-----|-----');
  console.log('     |     |');
  console.log('  ' + board[7] + '  |  ' + board[8] + '  |  ' + board[9]);
  console.log('     |     |');
}


function getPlayerMove({invalid} = {invalid: false}) {
  if (invalid) {
    prompt('Sorry, please give a number between 1 and 9');
  }
  prompt('Where would you like to make your move?');
  let response = readline.prompt();
  return [Number(response)];
}

function isValidMove(board, square) {
  return board[square] === ' ';
}

function updateBoard(board, mark, square) {
  board[square] = mark;
}

function performPlayerMove(board) {
  let square = getPlayerMove();
  while (!isValidMove(board, square)) {
    square = getPlayerMove({invalid: true});
  }
  updateBoard(board, PLAYER, square);
}

function performComputerMove(board) {
  if (isBoardFull(board)) return;
  let square;
  do  {
    square = getRandomNumberBetween(1, board.length - 1);
  } while (!isValidMove(board, square));
  updateBoard(board, 'O', square);
}

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getWinner(board) {
  return hasWinningRow(board) || hasWinningColumn(board)
    || hasWinningDiagonal(board);
}

function hasWinningRow(board) {
  for (let rowIdx = 1; rowIdx < board.length; rowIdx += 3) {
    if (board[rowIdx] === PLAYER && board[rowIdx + 1] === PLAYER &&
      board[rowIdx + 2] === PLAYER) {
      return PLAYER;
    } else if (board[rowIdx] === COMPUTER && board[rowIdx + 1] === COMPUTER &&
      board[rowIdx + 2] === COMPUTER) {
      return COMPUTER;
    }
  }
  return null;
}

function hasWinningColumn(board) {
  for (let colIdx = 1; colIdx < Math.floor(board.length / 3); colIdx++) {
    if (board[colIdx] === PLAYER && board[colIdx + 3] === PLAYER &&
      board[colIdx + 6] === PLAYER) {
      return PLAYER;
    } else if (board[colIdx] === COMPUTER && board[colIdx + 3] === COMPUTER &&
      board[colIdx + 6] === COMPUTER) {
      return COMPUTER;
    }
  }
  return null;
}

function hasWinningDiagonal(board) {
  if ((board[1] === PLAYER && board[5] === PLAYER && board[9] === PLAYER) ||
      (board[3] === PLAYER && board[5] === PLAYER && board[7] === PLAYER)) {
    return PLAYER;
  } else if ((board[1] === COMPUTER && board[5] === COMPUTER &&
    board[9] === COMPUTER) || (board[3] === COMPUTER && board[5] === COMPUTER &&
      board[7] === COMPUTER)) {
    return COMPUTER;
  }
  return null;
}

function displayWinner(winner) {
  if (winner === PLAYER) {
    console.log('You won!');
  } else if (winner === COMPUTER) {
    console.log('The Computer won!');
  }
}

function isBoardFull(board) {
  return board.every(mark => mark !== ' ');
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
