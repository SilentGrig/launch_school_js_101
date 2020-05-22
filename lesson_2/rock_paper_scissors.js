const readline = require('readline-sync');
const GAME_TYPES = require('./rock_paper_scissors_config.json');

const GAME_TYPE = 'RockPaperScissorsSpockLizard';
const CHOICES = Object.assign(GAME_TYPES[GAME_TYPE]);
const DISPLAY_CHOICES = Object.values(CHOICES).map(choice => choice.display);
const VALID_CHOICES = Object.keys(CHOICES);

const PLAYER_WINS_MESSAGE = 'You won the round!';
const COMPUTER_WINS_MESSAGE = 'Computer wins the round!';

// Global Variables for Game
let isPlaying = true;
let playerScore = 0;
let computerScore = 0;
let matchWon = false;
let roundsPlayed = 0;
let playerWins = 0;
let computerWins = 0;

function welcomeMessage() {
  prompt(`Welcome to ${GAME_TYPE}!`);
  console.log('\n\n\n');
}

function getFullHandChoice(choice) {
  choice = choice.toLowerCase();
  for (let choiceName of VALID_CHOICES) {
    if (choiceName === choice ||
        CHOICES[choiceName].shorthand === choice) {
      return choiceName;
    }
  }
  return null;
}

function getWinner(choice, computerChoice) {
  if (choice === computerChoice) return "It's a tie";

  if (CHOICES[choice]['beats'].includes(computerChoice)) {
    return PLAYER_WINS_MESSAGE;
  } else {
    return COMPUTER_WINS_MESSAGE;
  }
}

function displayScores(playerScore, computerScore) {
  prompt(`The points are: Player: ${playerScore}, Computer: ${computerScore}`);
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function getPlayAgainResponse() {
  prompt('Do you want to play again (y/n)?');

  let answer = readline.question();
  answer = answer.trim().toLowerCase();

  const validAnswers = ['y', 'yes', 'n', 'no'];

  while (!validAnswers.includes(answer)) {
    prompt("Please enter 'y' or 'n'.");
    answer = readline.question();
    answer = answer.trim().toLowerCase();
  }

  return answer[0];
}

function getPlayerChoice() {
  prompt(`Choose one: ${DISPLAY_CHOICES.join(', ')}`);
  let choice = getFullHandChoice(readline.question());

  while (!choice) {
    prompt("That's not a valid choice");
    choice = getFullHandChoice(readline.question());
  }

  return choice;
}

function getComputerChoice() {
  let randomIndex = Math.ceil(Math.random() * VALID_CHOICES.length) - 1;
  return VALID_CHOICES[randomIndex];
}

function updateScores(roundWinnerMessage) {
  if (roundWinnerMessage === PLAYER_WINS_MESSAGE) {
    playerScore += 1;
  } else if (roundWinnerMessage === COMPUTER_WINS_MESSAGE) {
    computerScore += 1;
  }
}

function pluraliseWord(word, times) {
  if (word === 'match' && times !== 1) {
    return word + 'es';
  } else if (times !== 1) {
    return word + 's';
  }
  return word;
}

function resetGame() {
  matchWon = false;
  playerScore = 0;
  computerScore = 0;
}

function getMatchWinner() {
  /* If match has been won returns 1 for player, 2 for computer
   * If match hasn't been won returns 0
  */
  if (playerScore === 3) {
    return 1;
  } else if (computerScore === 3) {
    return 2;
  }
  return 0;
}

function updateMatchScores(winner) {
  if (winner === 1) {
    playerWins += 1;
  } else if (winner === 2) {
    computerWins += 1;
  }
}

function displayWinner(winner) {
  console.log('\n');
  if (winner === 1) {
    prompt("You won the match!!!");
  } else if (winner === 2) {
    prompt("Unlucky, the computer won the match!");
  }
}

function displayMatchScores() {
  prompt(
    `You've played ${roundsPlayed} ${pluraliseWord('round', roundsPlayed)}!`
  );
  prompt(`You have won ${playerWins} ${pluraliseWord('match', playerWins)}!`);
  prompt(
    `The Computer has won ${computerWins} ${pluraliseWord('match', computerWins)}!`
  );
}

console.clear();
welcomeMessage();

// GAME LOOP
while (isPlaying) {
  let playerChoice = getPlayerChoice();
  let computerChoice = getComputerChoice();

  let roundWinner = getWinner(playerChoice, computerChoice);

  updateScores(roundWinner);

  console.clear();
  prompt(`You chose ${playerChoice}, computer chose ${computerChoice}`);
  prompt(roundWinner);
  displayScores(playerScore, computerScore);

  let matchWinner = getMatchWinner();

  if (matchWinner !== 0) {
    matchWon = true;
    updateMatchScores(matchWinner);
    displayWinner(matchWinner);
  }

  console.log('\n');

  if (matchWon) {
    roundsPlayed += 1;
    let answer = getPlayAgainResponse();

    if (answer === 'n') {
      isPlaying = false;
    } else {
      resetGame();
    }
    console.clear();
    displayMatchScores();
    console.log('\n');
  }
}

prompt('Goodbye!');
