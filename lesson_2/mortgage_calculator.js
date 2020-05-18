const readline = require('readline-sync');
const MESSAGES = require('./mortgage_calculator_messages.json');

function prompt(message) {
  return `--> ${message}`;
}

function promptUser(message) {
  console.log(prompt(message));
}

function getInput(message, validator, validationMessage) {
  let input;
  let validatedInput = null;

  do {
    input = readline.question(prompt(message));
    input = input.trim();
    validatedInput = validator(input);
    if (validatedInput === null) {
      promptUser(validationMessage);
    }
  } while (validatedInput === null);

  return validatedInput;
}

function loanValidator(input) {
  if (input.startsWith("£")) {
    input = input.slice(1);
  }
  input = input.replace(/,/g, '');
  let validatedInput = Number(input);
  // only use whole numbers for loan
  validatedInput = Math.floor(validatedInput);
  if (Number.isNaN(validatedInput) || validatedInput < 0) {
    return null;
  }
  return validatedInput;
}

function aprValidator(input) {
  let validatedInput = parseFloat(input, 10);
  if (Number.isNaN(validatedInput) || validatedInput < 0
      || validatedInput > 25) {
    return null;
  }
  return validatedInput;
}

function durationValidator(input) {
  let validatedInput = Number(input);
  if (Number.isNaN(validatedInput) || validatedInput < 1/12) {
    return null;
  }
  return validatedInput;
}

function getUserInputs() {
  let loanAmount = getInput(
    MESSAGES['loanAmountPrompt'],
    loanValidator,
    MESSAGES['loanAmountValidationMessage']
  );

  let apr = getInput(
    MESSAGES['aprPrompt'],
    aprValidator,
    MESSAGES['aprValidationMessage']
  );

  let durationInYears = getInput(
    MESSAGES['durationPrompt'],
    durationValidator,
    MESSAGES['durationValidationMessage']
  );
  return [loanAmount, apr, durationInYears];
}

function mortgageCalculator() {
  console.log("\n");

  let [loanAmount, apr, durationInYears] = getUserInputs();

  let durationInMonths = Math.floor(durationInYears * 12);
  let monthlyInterestRate = (apr / 100) / 12; // convert to decimal then to monthly amount


  let monthlyPayments;

  if (monthlyInterestRate > 0) {
    monthlyPayments = loanAmount *
      (monthlyInterestRate /
        (1 - Math.pow((1 + monthlyInterestRate), (-durationInMonths)))
      );
  } else {
    monthlyPayments = loanAmount / durationInMonths;
  }

  console.log('\n');
  promptUser(`${MESSAGES['monthlyPaymentsMessage']}${monthlyPayments.toFixed(2)}`);
  console.log('\n');
}

function main() {
  console.clear();
  promptUser(MESSAGES['welcomeMessage']);

  do {
    mortgageCalculator();

    let continueCalculating = readline
      .question(MESSAGES['anotherCalculationPrompt']);

    if (continueCalculating.toLowerCase()[0] !== 'y') {
      break;
    }

  } while (true);
}

main();
