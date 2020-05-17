const readline = require('readline-sync');
const GAME_TYPES = require('./rock_paper_scissors_config.json');

const CHOICES = Object.assign(GAME_TYPES['rockPaperScissors']);
const DISPLAY_CHOICES = Object.values(CHOICES).map(choice => choice.display);
const VALID_CHOICES = Object.keys(CHOICES);

function getFullHandChoice(choice) {
  for (let possibleChoice of VALID_CHOICES) {
    if (possibleChoice === choice || CHOICES[possibleChoice].shorthand === choice) {
      return possibleChoice;
    }
  }
  return null;
}

function getWinner(choice, computerChoice) {
  prompt(`You chose ${choice}, computer chose ${computerChoice}`);

  if (choice === computerChoice) return "It's a tie";

  if (CHOICES[choice]['beats'].includes(computerChoice)) {
    return 'You win!';
  } else {
    return 'Computer wins!';
  }
}

function prompt(message) {
  console.log(`=> ${message}`);
}

let isPlaying = true;

while (isPlaying) {
  prompt(`Choose one: ${DISPLAY_CHOICES.join(', ')}`);
  let choice = getFullHandChoice(readline.question());

  while (!choice) {
    prompt("That's not a valid choice");
    choice = getFullHandChoice(readline.question());
  }

  let randomIndex = Math.ceil(Math.random() * VALID_CHOICES.length) - 1;
  let computerChoice = VALID_CHOICES[randomIndex];

  prompt(getWinner(choice, computerChoice));

  prompt('Do you want to play again (y/n)?');
  let answer = readline.question().toLowerCase();
  while (answer[0] !== 'n' && answer !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }

  if (answer[0] !== 'y') isPlaying = false;
}
