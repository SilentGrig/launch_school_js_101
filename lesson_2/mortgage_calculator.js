const readline = require('readline-sync');

function prompt(message) {
  return `--> ${message}`;
}

function promptUser(message) {
  console.log(prompt(message));
}

function getInput(message, validator, validationMessage) {
  let input;
  let validatedInput;
  let err = false;

  do {
    if (err) {
      promptUser(validationMessage);
    }
    input = readline.question(prompt(message));
    [validatedInput, err] = validator(input);
  } while (err);

  return validatedInput;
}

function loanValidator(input) {
  let err = false;
  if (input.startsWith("£") || input.startsWith("$")) {
    input = input.slice(1);
  }
  input = input.replace(/,/g, '');
  // silently truncate floating point numbers
  let validatedInput = parseInt(input, 10);
  if (Number.isNaN(validatedInput) || validatedInput < 0) {
    err = true;
  }
  return [validatedInput, err];
}

function aprValidator(input) {
  let err = false;
  let validatedInput = parseFloat(input, 10);
  if (Number.isNaN(validatedInput) || validatedInput < 0
      || validatedInput > 25) {
    err = true;
  }
  return [validatedInput, err];
}

function durationValidator(input) {
  let err = false;
  let validatedInput = parseInt(input, 10);
  if (Number.isNaN(validatedInput) || validatedInput < 1
      || validatedInput > 30) {
    err = true;
  }
  return [validatedInput, err];
}

let loanAmount = getInput(
  'How much loan would you like to borrow? (>= £0) - input will be rounded down: ',
  loanValidator,
  'Sorry, the loan amount must be a non-negative number.');

let apr = getInput(
  'What is the Annual Percentage Rate? (>= 0% APR <= 25%): ',
  aprValidator,
  'Sorry, the Annual Percentage Rate must be between 0% and 25%.'
);

let durationInYears = getInput(
  'How long is the loan duration? (>= 1 whole years <= 30) - input will be rounded down: ',
  durationValidator,
  'Sorry, the loan duration must be between 1 and 30 years.');

let durationInMonths = durationInYears * 12;
let monthlyInterestRate = (apr / 100) / 12; // convert to decimal then to monthly amount

let monthlyPayments = loanAmount *
  (monthlyInterestRate /
    (1 - Math.pow((1 + monthlyInterestRate), (-durationInMonths)))
  );

promptUser(`Your monthly payments are £${monthlyPayments.toFixed(2)}`);