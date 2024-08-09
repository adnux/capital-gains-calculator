const readline = require('readline');
const StockTaxCalculator = require('./stockTaxCalculatorClass');
const { format } = require('path');

// Create a readline interface
const lineReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const calculator = new StockTaxCalculator();

// Main function to start the program
function main() {
  console.log('\x1b[43m Enter JSON arrays of operations, one array per line. \x1b[0m');
  promptUser();
}

// Function to prompt user for input
function promptUser() {
  lineReader.question('\x1b[44m Enter operations (or press Enter to finish): \x1b[0m\n', (input) => {
    if (input.trim() === '') {
      lineReader.close();
    } else {
      calculator.processInputLine(input);
      promptUser();
    }
  });
}

// Event listener for line input
lineReader.on('line', (line) => {
  if (line.trim() === '') {
    lineReader.close();
  } else {
    const operationCount = calculator.processInputLine(line);
    console.log(`\x1b[32mProcessed set of ${operationCount} operations\x1b[0m`);
  }
});

// Event listener for when input is closed
lineReader.on('close', () => {
  console.log('\x1b[42m Finished processing all operations: \x1b[0m');
  const allTaxResults = calculator.formatTaxResults();
  allTaxResults.forEach((taxResults) => {
    console.log('\x1b[100m', JSON.stringify(taxResults.map(({ tax }) => ({ tax: calculator.roundValue(tax) }))), '\x1b[0m');
    // console.log(JSON.stringify(taxResults.map(({ tax }) => ({ tax: Number(tax.toFixed(2)) }))));
  });
});

// Start the main function
main();
