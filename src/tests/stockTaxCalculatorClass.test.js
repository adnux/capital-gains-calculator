const StockTaxCalculator = require('../stockTaxCalculatorClass');

describe('Stock Tax Calculator', () => {
  it('Case 0', async () => {
    // Given
    const jsonInput1 = JSON.stringify([
      { operation: 'buy', 'unit-cost': 10.0, quantity: 10000 },
      { operation: 'sell', 'unit-cost': 20.0, quantity: 5000 },
    ]);
    const calculator = new StockTaxCalculator()
    calculator.processInputLine(jsonInput1);
    const jsonInput2 = JSON.stringify([
      { operation: 'buy', 'unit-cost': 20.0, quantity: 10000 },
      { operation: 'sell', 'unit-cost': 10.0, quantity: 5000 },
    ]);
    // When
    calculator.processInputLine(jsonInput2);
    const result = calculator.formatTaxResults();
    // Then
    const expectedTaxes = [
      [{ tax: 0 }, { tax: 10000 }],
      [{ tax: 0 }, { tax: 0 }],
    ];
    expect(result).toEqual(expectedTaxes);
  });

  it('Case 1', async () => {
    // Given
    const jsonInput = JSON.stringify([
      { operation: 'buy', 'unit-cost': 10.0, quantity: 100 },
      { operation: 'sell', 'unit-cost': 15.0, quantity: 50 },
      { operation: 'sell', 'unit-cost': 15.0, quantity: 50 },
    ]);
    // When
    const calculator = new StockTaxCalculator()
    calculator.processInputLine(jsonInput);
    const result = calculator.formatTaxResults();
    // Then
    // const expectedTaxes = [{"tax": 0}, {"tax": 0}, {"tax": 0}];
    const expectedTaxes = [[{ tax: 0 }, { tax: 0 }, { tax: 0 }]];
    expect(result).toEqual(expectedTaxes);
  });

  it('Case 2', async () => {
    // Given
    const jsonInput = JSON.stringify([
      { operation: 'buy', 'unit-cost': 10.0, quantity: 10000 },
      { operation: 'sell', 'unit-cost': 20.0, quantity: 5000 },
      { operation: 'sell', 'unit-cost': 5.0, quantity: 5000 },
    ]);
    // When
    const calculator = new StockTaxCalculator()
    calculator.processInputLine(jsonInput);
    const result = calculator.formatTaxResults();
    // Then
    const expectedTaxes = [[{ tax: 0 }, { tax: 10000 }, { tax: 0 }]];
    expect(result).toEqual(expectedTaxes);
  });

  it('Case 1+2', async () => {
    // Given
    const jsonInput1 = JSON.stringify([
      { operation: 'buy', 'unit-cost': 10.0, quantity: 100 },
      { operation: 'sell', 'unit-cost': 15.0, quantity: 50 },
      { operation: 'sell', 'unit-cost': 15.0, quantity: 50 },
    ]);
    const jsonInput2 = JSON.stringify([
      { operation: 'buy', 'unit-cost': 10.0, quantity: 10000 },
      { operation: 'sell', 'unit-cost': 20.0, quantity: 5000 },
      { operation: 'sell', 'unit-cost': 5.0, quantity: 5000 },
    ]);
    // When
    const calculator = new StockTaxCalculator()
    calculator.processInputLine(jsonInput1);
    calculator.processInputLine(jsonInput2);
    const result = calculator.formatTaxResults();
    // Then
    const expectedTaxes = [
      [{ tax: 0 }, { tax: 0 }, { tax: 0 }],
      [{ tax: 0 }, { tax: 10000 }, { tax: 0 }],
    ];
    expect(result).toEqual(expectedTaxes);
  });

  it('Case 3', async () => {
    // Given
    const jsonInput = JSON.stringify([
      { operation: 'buy', 'unit-cost': 10.0, quantity: 10000 },
      { operation: 'sell', 'unit-cost': 5.0, quantity: 5000 },
      { operation: 'sell', 'unit-cost': 20.0, quantity: 3000 },
    ]);
    // When
    const calculator = new StockTaxCalculator()
    calculator.processInputLine(jsonInput);
    const result = calculator.formatTaxResults();
    // Then
    const expectedTaxes = [[{ tax: 0 }, { tax: 0 }, { tax: 1000 }]];
    expect(result).toEqual(expectedTaxes);
  });

  it('Case 4', async () => {
    // Given
    const jsonInput = JSON.stringify([
      { operation: 'buy', 'unit-cost': 10.0, quantity: 10000 },
      { operation: 'buy', 'unit-cost': 25.0, quantity: 5000 },
      { operation: 'sell', 'unit-cost': 15.0, quantity: 10000 },
    ]);
    // When
    const calculator = new StockTaxCalculator()
    calculator.processInputLine(jsonInput);
    const result = calculator.formatTaxResults();
    // Then
    const expectedTaxes = [[{ tax: 0 }, { tax: 0 }, { tax: 0 }]];
    expect(result).toEqual(expectedTaxes);
  });

  it('Case 5', async () => {
    // Given
    const jsonInput = JSON.stringify([
      { operation: 'buy', 'unit-cost': 10.0, quantity: 10000 },
      { operation: 'buy', 'unit-cost': 25.0, quantity: 5000 },
      { operation: 'sell', 'unit-cost': 15.0, quantity: 10000 },
      { operation: 'sell', 'unit-cost': 25.0, quantity: 5000 },
    ]);
    // When
    const calculator = new StockTaxCalculator()
    calculator.processInputLine(jsonInput);
    const result = calculator.formatTaxResults();
    // Then
    const expectedTaxes = [[{ tax: 0 }, { tax: 0 }, { tax: 0 }, { tax: 10000 }]];
    expect(result).toEqual(expectedTaxes);
  });

  it('Case 6', async () => {
    // Given
    const jsonInput = JSON.stringify([
      { operation: 'buy', 'unit-cost': 10.0, quantity: 10000 },
      { operation: 'sell', 'unit-cost': 2.0, quantity: 5000 },
      { operation: 'sell', 'unit-cost': 20.0, quantity: 2000 },
      { operation: 'sell', 'unit-cost': 20.0, quantity: 2000 },
      { operation: 'sell', 'unit-cost': 25.0, quantity: 1000 },
    ]);
    // When
    const calculator = new StockTaxCalculator()
    calculator.processInputLine(jsonInput);
    const result = calculator.formatTaxResults();
    // Then
    const expectedTaxes = [[{ tax: 0 }, { tax: 0 }, { tax: 0 }, { tax: 0 }, { tax: 3000 }]];
    expect(result).toEqual(expectedTaxes);
  });

  it('Case 7', async () => {
    // Given
    const jsonInput = JSON.stringify([
      { operation: 'buy', 'unit-cost': 10.0, quantity: 10000 },
      { operation: 'sell', 'unit-cost': 2.0, quantity: 5000 },
      { operation: 'sell', 'unit-cost': 20.0, quantity: 2000 },
      { operation: 'sell', 'unit-cost': 20.0, quantity: 2000 },
      { operation: 'sell', 'unit-cost': 25.0, quantity: 1000 },
      { operation: 'buy', 'unit-cost': 20.0, quantity: 10000 },
      { operation: 'sell', 'unit-cost': 15.0, quantity: 5000 },
      { operation: 'sell', 'unit-cost': 30.0, quantity: 4350 },
      { operation: 'sell', 'unit-cost': 30.0, quantity: 650 },
    ]);
    // When
    const calculator = new StockTaxCalculator()
    calculator.processInputLine(jsonInput);
    const result = calculator.formatTaxResults();
    const expectedTaxes = [
      [
        { tax: 0 },
        { tax: 0 },
        { tax: 0 },
        { tax: 0 },
        { tax: 3000 },
        { tax: 0 },
        { tax: 0 },
        { tax: 3700 },
        { tax: 0 },
      ],
    ];
    expect(result).toEqual(expectedTaxes);
  });

  it('Case 8', async () => {
    // Given
    const jsonInput = JSON.stringify([
      { operation: 'buy', 'unit-cost': 10.0, quantity: 10000 },
      { operation: 'sell', 'unit-cost': 50.0, quantity: 10000 },
      { operation: 'buy', 'unit-cost': 20.0, quantity: 10000 },
      { operation: 'sell', 'unit-cost': 50.0, quantity: 10000 },
    ]);
    // When
    const calculator = new StockTaxCalculator()
    calculator.processInputLine(jsonInput);
    const result = calculator.formatTaxResults();
    // Then
    const expectedTaxes = [[{ tax: 0 }, { tax: 80000 }, { tax: 0 }, { tax: 60000 }]];
    expect(result).toEqual(expectedTaxes);
  });

  it('Case 9', async () => {
    // Given
    const jsonInput = JSON.stringify([
      { operation: 'buy', 'unit-cost': 20.0, quantity: 10000 },
      { operation: 'buy', 'unit-cost': 10.0, quantity: 5000 },
      { operation: 'sell', 'unit-cost': 16.67, quantity: 15000 },
    ]);
    // When
    const calculator = new StockTaxCalculator()
    calculator.processInputLine(jsonInput);
    const result = calculator.formatTaxResults();
    // Then
    const expectedTaxes = [[{ tax: 0 }, { tax: 0 }, { tax: 0 }]];
    expect(result).toEqual(expectedTaxes);
  });

  it('Case 10', async () => {
    // Given
    const jsonInput = JSON.stringify([
      { operation: 'buy', 'unit-cost': 13.0, quantity: 10000 },
      { operation: 'sell', 'unit-cost': 2.0, quantity: 5000 },
      { operation: 'sell', 'unit-cost': 21.0, quantity: 1000 },
      { operation: 'sell', 'unit-cost': 27.0, quantity: 1000 },
      { operation: 'sell', 'unit-cost': 29.0, quantity: 3000 },
      { operation: 'buy', 'unit-cost': 18.0, quantity: 10000 },
      { operation: 'sell', 'unit-cost': 15.0, quantity: 5000 },
      { operation: 'sell', 'unit-cost': 33.33, quantity: 4350 },
      { operation: 'sell', 'unit-cost': 30.21, quantity: 650 },
    ]);
    // When
    const calculator = new StockTaxCalculator();
    calculator.processInputLine(jsonInput);
    const result = calculator.formatTaxResults();
    // Then
    const expectedTaxes = [
      [
        { tax: 0 },
        { tax: 0 },
        { tax: 0 },
        { tax: 0 },
        { tax: 3000 },
        { tax: 0 },
        { tax: 0 },
        { tax: 3737.1 },
        { tax: 0 },
      ],
    ];
    expect(result).toEqual(expectedTaxes);
  });
});
