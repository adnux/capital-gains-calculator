class StockTaxCalculator {
  constructor() {
    this.allTaxResults = [];
    this.buyOperations = [];
    this.totalLoss = 0;
    this.totalShares = 0;
    this.weightedAverageCost = 0;
  }

  resetDataStructures() {
    this.allTaxResults = [];
    this.buyOperations = [];
    this.totalLoss = 0;
    this.totalShares = 0;
    this.weightedAverageCost = 0;
  }

  roundValue(value) {
    return Math.round(value * 100) / 100;
  }

  processInputLine(line) {
    try {
      const operationSet = JSON.parse(line);
      if (!Array.isArray(operationSet)) {
        throw new Error('Input must be an array of operations');
      }
      const taxResults = this.processOperationSet(operationSet);
      this.allTaxResults.push(taxResults);
      return operationSet.length;
    } catch (error) {
      console.error('\x1b[31mError processing input:', error.message, '\x1b[0m');
    }
  }

  processOperationSet(operations) {
    const taxResults = [];
    for (const operation of operations) {
      const tax = this.calculateTax(operation);
      taxResults.push({ tax });
    }
    return taxResults;
  }

  calculateTax(operation) {
    const { operation: type, 'unit-cost': unitCost, quantity } = operation;

    if (type === 'buy') {
      return this.handleBuyOperation({ unitCost, quantity });
    }
    if (type === 'sell') {
      return this.handleSellOperation({ unitCost, quantity });
    }
    return 0;
  }

  handleBuyOperation({ unitCost, quantity }) {
    const currentAmount = this.totalShares * this.weightedAverageCost;
    this.totalShares += quantity;
    const rawWeightedAverageCost = (quantity * unitCost + currentAmount) / this.totalShares;
    this.weightedAverageCost = this.roundValue(rawWeightedAverageCost);

    this.buyOperations.push({ unitCost, quantity });
    return 0;
  }

  handleSellOperation({ unitCost, quantity }) {
    const profit = (unitCost - this.weightedAverageCost) * quantity;
    this.totalShares -= quantity;
    if (profit < 0) {
      this.totalLoss += Math.abs(profit);
      return 0;
    } else {
      return this.calculateTaxFromProfit({ profit, unitCost, quantity });
    }
  }

  calculateTaxFromProfit({ profit, unitCost, quantity }) {
    if (unitCost * quantity < 20000) {
      return 0;
    }
    if (this.totalLoss > 0) {
      if (profit <= this.totalLoss) {
        this.totalLoss -= profit;
        return 0;
      } else {
        const taxableProfit = profit - this.totalLoss;
        const tax = taxableProfit * 0.2;
        return Number(this.roundValue(tax));
      }
    } else {
      const tax = profit * 0.2;
      return Number(this.roundValue(tax));
    }
  }

  formatTaxResults() {
    return this.allTaxResults.map((taxResults) => (
      taxResults.flat(({ tax }) => ({ tax: this.roundValue(tax) }))
    ));
  }
}

module.exports = StockTaxCalculator;