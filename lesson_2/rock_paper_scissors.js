const readline = require('readline-sync');
const CONFIG = require('./rock_paper_scissors_config.json');

// pick which game to play - see config file for options
const GAME_TYPE = 'RockPaperScissorsSpockLizard';

// Game Constants
const {
  DISPLAY_CHOICES,
  VALID_CHOICES,
  CHOICE_BEATS
} = parseConfig(CONFIG, GAME_TYPE);
const PLAYER = 'player';
const COMPUTER = 'computer';
const DRAW = 'draw';

/*
 * Config Parsing Functions
 */

function parseConfig(config, gameType) {
  const GAME_TYPE_CONFIG = config[gameType];

  const DISPLAY_CHOICES = GAME_TYPE_CONFIG.map(choice => choice.display);

  const VALID_CHOICES = GAME_TYPE_CONFIG.reduce((choices, choice) => {
    choices[choice.name] = choice.validInputs;
    return choices;
  }, {});

  const CHOICE_BEATS = GAME_TYPE_CONFIG.reduce((choices, choice) => {
    choices[choice.name] = choice.beats;
    return choices;
  }, {});

  return {
    DISPLAY_CHOICES,
    VALID_CHOICES,
    CHOICE_BEATS
  };
}

/*
 * Display Functions
 */
function prompt(message) {
  console.log(`=> ${message}`);
}

function welcomeMessage(gameType) {
  console.clear();
  prompt(`Welcome to ${gameType}!`);
  console.log('\n\n\n');
}

function displayRoundOutcome(roundWinner, playerChoice,
  computerChoice, gameState) {

  const { playerRoundScore, computerRoundScore } = gameState;

  console.clear();
  prompt(`You chose ${playerChoice}, computer chose ${computerChoice}`);
  if (roundWinner === PLAYER) {
    prompt('You won the round!');
  } else if (roundWinner === COMPUTER) {
    prompt('Computer wins the round!');
  } else if (roundWinner === DRAW) {
    prompt("It's a tie!");
  }
  prompt(
    `The points are: Player: ${playerRoundScore}, Computer: ${computerRoundScore}`
  );
}

function displayWinner(winner) {
  console.log('\n');
  if (winner === PLAYER) {
    prompt("You won the match!!!");
  } else if (winner === COMPUTER) {
    prompt("Unlucky, the computer won the match!");
  }
}

function displayMatchScores(gameState) {
  const { roundsPlayed, playerMatchScore, computerMatchScore } = gameState;

  console.clear();
  prompt(
    `You've played ${roundsPlayed} ${pluraliseWord('round', roundsPlayed)}!`
  );
  prompt(`You have won ${playerMatchScore} ${pluraliseWord('match', playerMatchScore)}!`);
  prompt(
    `The Computer has won ${computerMatchScore} ${pluraliseWord('match', computerMatchScore)}!`
  );
  console.log('\n');
}

/*
 * Input Functions
 */

function getPlayerChoice(displayChoices, validChoices) {
  prompt(`Choose one: ${displayChoices.join(', ')}`);
  let choice = readline.question();
  let validatedChoice = getValidatedPlayerChoice(choice, validChoices);

  while (!validatedChoice) {
    prompt("That's not a valid choice");
    choice = readline.question();
    validatedChoice = getValidatedPlayerChoice(choice, validChoices);
  }

  return validatedChoice;
}

function getValidatedPlayerChoice(playerChoice, validChoices) {
  playerChoice = playerChoice.trim().toLowerCase();

  for (let choice of Object.keys(validChoices)) {
    let validInputs = validChoices[choice];
    if (validInputs.includes(playerChoice)) {
      return choice;
    }
  }

  return null;
}

function getComputerChoice(validChoices) {
  let randomIndex = Math.ceil(Math.random() * validChoices.length) - 1;
  return validChoices[randomIndex];
}

function getPlayAgainResponse() {
  prompt('Do you want to play again (y/n)?');

  let answer = readline.question();
  answer = answer.trim().toLowerCase();

  while (!['y', 'yes', 'n', 'no'].includes(answer)) {
    prompt("Please enter 'y' or 'n'.");
    answer = readline.question();
    answer = answer.trim().toLowerCase();
  }

  return ['yes', 'y'].includes(answer);
}

/*
 * Game Helper Functions
 */

function getInitialGameState() {
  const gameState = {
    matchWon: false,
    playerRoundScore: 0,
    computerRoundScore: 0,
    playerMatchScore: 0,
    computerMatchScore: 0,
    roundsPlayed: 0
  };
  // prevent new properties from being added
  Object.seal(gameState);
  return gameState;
}

function playRound(gameState) {
  let playerChoice = getPlayerChoice(DISPLAY_CHOICES, VALID_CHOICES);
  let computerChoice = getComputerChoice(Object.keys(VALID_CHOICES));

  let roundWinner = getRoundWinner(
    CHOICE_BEATS, playerChoice, computerChoice
  );

  updateRoundScores(roundWinner, gameState);
  displayRoundOutcome(roundWinner, playerChoice, computerChoice, gameState);
}

function getRoundWinner(choiceBeats, playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return DRAW;

  if (choiceBeats[playerChoice].includes(computerChoice)) {
    return PLAYER;
  } else {
    return COMPUTER;
  }
}

function getMatchWinner(gameState) {
  if (gameState.playerRoundScore === 3) {
    return PLAYER;
  } else if (gameState.computerRoundScore === 3) {
    return COMPUTER;
  }
  return null;
}

function updateRoundScores(roundWinner, gameState) {
  if (roundWinner === PLAYER) {
    gameState.playerRoundScore += 1;
  } else if (roundWinner === COMPUTER) {
    gameState.computerRoundScore += 1;
  }
}

function updateMatchScoresAndState(winner, gameState) {
  if (winner === PLAYER) {
    gameState.playerMatchScore += 1;
  } else if (winner === COMPUTER) {
    gameState.computerMatchScore += 1;
  }
  gameState.matchWon = true;
}

function updateGameStateOnRoundOver(gameState) {
  gameState.roundsPlayed += 1;
  gameState.matchWon = false;
  gameState.playerRoundScore = 0;
  gameState.computerRoundScore = 0;
}

/*
 * Utility Helper Functions
 */

function pluraliseWord(word, times) {
  if (word === 'match' && times !== 1) {
    return word + 'es';
  } else if (times !== 1) {
    return word + 's';
  }
  return word;
}


// eslint-disable-next-line max-statements
(function() {
  const gameState = getInitialGameState();

  welcomeMessage(GAME_TYPE);

  let isPlaying = true;
  // GAME LOOP
  while (isPlaying) {
    playRound(gameState);

    let matchWinner = getMatchWinner(gameState);
    if (matchWinner) {
      updateMatchScoresAndState(matchWinner, gameState);
      displayWinner(matchWinner, gameState);
    }

    console.log('\n'); // spacing to keep player input on same line

    if (gameState.matchWon) {
      updateGameStateOnRoundOver(gameState);
      if (!getPlayAgainResponse()) {
        isPlaying = false;
      }
      displayMatchScores(gameState);
    }
  }

  prompt('Goodbye!');
})();

