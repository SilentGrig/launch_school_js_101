const readline = require('readline-sync');
const MESSAGES = require('./calculator_messages.json');

const LOCALISATION_CHOICE = 'test';
const LOCALISATION = LOCALISATION_CHOICE in MESSAGES ?
  LOCALISATION_CHOICE : 'english';

function messages(message, lang = 'english') {
  return MESSAGES[lang][message];
}

function prompt(message, output = '') {
  message = messages(message, LOCALISATION)
  console.log(`=> ${message}${output}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

let doCalculation = true;
prompt('welcomeMessage');

while (doCalculation) {
  prompt('firstNumberPrompt');
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt('invalidNumberPrompt');
    number1 = readline.question();
  }

  prompt('secondNumberPrompt');
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt('invalidNumberPrompt');
    number2 = readline.question();
  }

  prompt('operationsPrompt');
  let operation = readline.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt('invalidOperationPrompt');
    operation = readline.question();
  }

  let output;
  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
  }
  // Print the result to the terminal.
  prompt('resultPrompt', ` ${output}`);

  // default response is Y
  // if response is N or n stop asking for calculations
  prompt('anotherCalculationPrompt');
  const response = readline.question();
  if (response.toLowerCase() === 'n') {
    doCalculation = false;
  }
}

prompt('goodbyePrompt');
