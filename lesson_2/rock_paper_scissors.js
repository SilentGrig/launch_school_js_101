const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors'];

function getWinner(choice, computerChoice) {
  prompt(`You chose ${choice}, computer chose ${computerChoice}`);

  if ((choice === 'rock' && computerChoice === 'scissors') ||
    (choice === 'paper' && computerChoice === 'rock') ||
    (choice === 'scissors' && computerChoice === 'paper')) {
    return 'You win!';
  } else if ((choice === 'rock' && computerChoice === 'paper') ||
    (choice === 'paper' && computerChoice === 'scissors') ||
    (choice === 'scissors' && computerChoice === 'rock')) {
    return 'Computer wins!';
  } else {
    return "It's a tie";
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
