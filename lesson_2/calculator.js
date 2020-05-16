const readline = require('readline-sync');
const messages = require('./calculator_messages.json');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

let doCalculation = true;
prompt(messages.welcomeMessage);

while (doCalculation) {
  prompt(messages.firstNumberPrompt);
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt(messages.invalidNumberPrompt);
    number1 = readline.question();
  }

  prompt(messages.secondNumberPrompt);
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt(messages.invalidNumberPrompt);
    number2 = readline.question();
  }

  prompt(messages.operationsPrompt);
  let operation = readline.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(messages.invalidOperationPrompt);
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
  prompt(`${messages.resultPrompt} ${output}`);

  // default response is Y
  // if response is N or n stop asking for calculations
  prompt(messages.anotherCalculationPrompt);
  const response = readline.question();
  if (response.toLowerCase() === 'n') {
    doCalculation = false;
  }
}

prompt(messages.goodbyePrompt);
