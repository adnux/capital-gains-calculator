// Define reusable data structures
let allTaxResults = [];
let buyOperations = [];
let totalLoss = 0;
let totalShares = 0;
let weightedAverageCost = 0;

// Function to reset all data structures
function resetDataStructures() {
  allTaxResults = [];
  buyOperations = [];
  totalLoss = 0;
  totalShares = 0;
  weightedAverageCost = 0;
}

// Function to round a value to 2 decimal places
function roundValue(value) {
  return Math.round(value * 100) / 100;
}

// Function to process each input line
function processInputLine(line) {
  try {
    const operationSet = JSON.parse(line);
    if (!Array.isArray(operationSet)) {
      throw new Error('Input must be an array of operations');
    }
    const taxResults = processOperationSet(operationSet);
    allTaxResults.push(taxResults);
    return operationSet.length;
  } catch (error) {
    console.error('\x1b[31mError processing input:', error.message, '\x1b[0m');
  }
}

// Function to process a set of operations
function processOperationSet(operations) {
  const taxResults = [];
  for (const operation of operations) {
    const tax = calculateTax(operation);
    taxResults.push({ tax });
  }
  return taxResults;
}

// Function to calculate tax based on the operation
function calculateTax(operation) {
  const { operation: type, 'unit-cost': unitCost, quantity } = operation;

  if (type === 'buy') {
    return handleBuyOperation({ unitCost, quantity });
  }
  if (type === 'sell') {
    return handleSellOperation({ unitCost, quantity });
  }
  return 0;
}

// Function to handle buy operations
function handleBuyOperation({ unitCost, quantity }) {
  const currentAmount = totalShares * weightedAverageCost;
  totalShares += quantity;
  const rawWeightedAverageCost = (quantity * unitCost + currentAmount) / totalShares;
  // weightedAverageCost = rawWeightedAverageCost.toFixed(2);
  weightedAverageCost = roundValue(rawWeightedAverageCost);

  // console.log('weightedAverageCost =====> ', weightedAverageCost);

  buyOperations.push({ unitCost, quantity });
  return 0;
}

// Function to handle sell operations
function handleSellOperation({ unitCost, quantity }) {
  const profit = (unitCost - weightedAverageCost) * quantity;
  totalShares -= quantity;
  if (profit < 0) {
    totalLoss += Math.abs(profit);
    return 0;
  } else {
    return calculateTaxFromProfit({ profit, unitCost, quantity });
  }
}

// Function to calculate tax from profit
function calculateTaxFromProfit({ profit, unitCost, quantity }) {
  // console.log(' ===== NEW TAX CALCULATION ===== ');
  if (unitCost * quantity < 20000) {
    return 0;
  }
  if (totalLoss > 0) {
    if (profit <= totalLoss) {
      totalLoss -= profit;
      return 0;
    } else {
      const taxableProfit = profit - totalLoss;
      const tax = taxableProfit * 0.2;
      return Number(roundValue(tax));
    }
  } else {
    const tax = profit * 0.2;
    return Number(roundValue(tax));
  }
}

function formatTaxResults() {
  return allTaxResults.map((taxResults) => (
    taxResults.flat(({ tax }) => ({ tax: roundValue(tax) }))
  ));
}

module.exports = {
  roundValue,
  processInputLine,
  processOperationSet,
  calculateTax,
  handleBuyOperation,
  handleSellOperation,
  calculateTaxFromProfit,
  formatTaxResults,
  resetDataStructures,
};
