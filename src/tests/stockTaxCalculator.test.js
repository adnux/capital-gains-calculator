const { processInputLine, formatTaxResults, resetDataStructures } = require('../stockTaxCalculator');

describe('Stock Tax Calculator', () => {
  beforeEach(() => {
    resetDataStructures();
  });

  it('Case 0', async () => {
    // Given
    const jsonInput1 = JSON.stringify([
      { operation: 'buy', 'unit-cost': 10.0, quantity: 10000 },
      { operation: 'sell', 'unit-cost': 20.0, quantity: 5000 },
    ]);
    processInputLine(jsonInput1);
    const jsonInput2 = JSON.stringify([
      { operation: 'buy', 'unit-cost': 20.0, quantity: 10000 },
      { operation: 'sell', 'unit-cost': 10.0, quantity: 5000 },
    ]);
    // When
    processInputLine(jsonInput2);
    const result = formatTaxResults();
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
    processInputLine(jsonInput);
    const result = formatTaxResults();
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
    processInputLine(jsonInput);
    const result = formatTaxResults();
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
    processInputLine(jsonInput1);
    processInputLine(jsonInput2);
    const result = formatTaxResults();
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
    processInputLine(jsonInput);
    const result = formatTaxResults();
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
    processInputLine(jsonInput);
    const result = formatTaxResults();
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
    processInputLine(jsonInput);
    const result = formatTaxResults();
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
    processInputLine(jsonInput);
    const result = formatTaxResults();
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
    processInputLine(jsonInput);
    const result = formatTaxResults();
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
    processInputLine(jsonInput);
    const result = formatTaxResults();
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
    processInputLine(jsonInput);
    const result = formatTaxResults();
    // Then
    const expectedTaxes = [[{ tax: 0 }, { tax: 0 }, { tax: 0 }]];
    expect(result).toEqual(expectedTaxes);
  });
});
