const readline = require('readline-sync');
const GAME_TYPES = require('./rock_paper_scissors_config.json');

const GAME_TYPE = 'RockPaperScissorsSpockLizard';
const CHOICES = Object.assign(GAME_TYPES[GAME_TYPE]);
const DISPLAY_CHOICES = Object.values(CHOICES).map(choice => choice.display);
const VALID_CHOICES = Object.keys(CHOICES);

const PLAYER_WINS_MESSAGE = 'You won the round!';
const COMPUTER_WINS_MESSAGE = 'Computer wins the round!';

function welcomeMessage() {
  prompt(`Welcome to ${GAME_TYPE}!`);
  console.log('\n\n\n');
}

function getFullHandChoice(choice) {
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
  let answer = readline.question().toLowerCase();
  while (answer[0] !== 'n' && answer !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }
  return answer;
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

let isPlaying = true;
let playerScore = 0;
let computerScore = 0;
let matchWon = false;
console.clear();

welcomeMessage();

// GAME LOOP
while (isPlaying) {
  let playerChoice = getPlayerChoice();
  let computerChoice = getComputerChoice();

  let roundWinner = getWinner(playerChoice, computerChoice);

  if (roundWinner === PLAYER_WINS_MESSAGE) {
    playerScore += 1;
  } else if (roundWinner === COMPUTER_WINS_MESSAGE) {
    computerScore += 1;
  }

  console.clear();
  prompt(`You chose ${playerChoice}, computer chose ${computerChoice}`);
  prompt(roundWinner);
  displayScores(playerScore, computerScore);

  if (playerScore === 3) {
    matchWon = true;
    console.log('\n');
    prompt("You won the match!!!");
  } else if (computerScore === 3) {
    matchWon = true;
    console.log('\n');
    prompt("Unlucky, the computer won the match!");
  }

  console.log('\n');

  if (matchWon) {
    let answer = getPlayAgainResponse();

    if (answer !== 'y') {
      isPlaying = false;
    } else { // reset game
      matchWon = false;
      playerScore = 0;
      computerScore = 0;
      console.clear();
    }
  }
}
