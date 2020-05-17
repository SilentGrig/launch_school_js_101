const readline = require('readline-sync');
const GAME_TYPES = require('./rock_paper_scissors_config.json');

const VALID_CHOICES = Object.keys(GAME_TYPES['rockPaperScissorsSpockLizard']);
const CHOICE_BEATS = Object.assign(GAME_TYPES['rockPaperScissorsSpockLizard']);

function getWinner(choice, computerChoice) {
  prompt(`You chose ${choice}, computer chose ${computerChoice}`);

  if (choice === computerChoice) return "It's a tie";

  if (CHOICE_BEATS[choice].includes(computerChoice)) {
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
  prompt(`Choose one: ${VALID_CHOICES.join(', ')}`);
  let choice = readline.question();

  while (!VALID_CHOICES.includes(choice)) {
    prompt("That's not a valid choice");
    choice = readline.question();
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
