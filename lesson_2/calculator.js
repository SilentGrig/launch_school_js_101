const readline = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

let doCalculation = true;
prompt('Welcome to the Calculator!');

while (doCalculation) {
  prompt("What's the first number?");
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt("Hmm... that doesn't look like a valid number.");
    number1 = readline.question();
  }

  prompt("What's the second number?");
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt("Hmm... that doesn't look like a valid number.");
    number2 = readline.question();
  }

  prompt(`What operation would you like to perform?
1) Add 2) Subtract 3) Multiply 4) Divide`);
  let operation = readline.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt('Must choose 1, 2, 3 or 4');
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
  prompt(`The result is: ${output}`);

  // default response is Y
  // if response is N or n stop asking for calculations
  prompt('Do you want to perform another calculation? (Y/n)');
  const response = readline.question();
  if (response.toLowerCase() === 'n') {
    doCalculation = false;
  }
}

prompt('Goodbye!');
