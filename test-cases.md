# Case 0:
```json
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
{"operation":"sell", "unit-cost":20.00, "quantity": 5000}]
[{"operation":"buy", "unit-cost":20.00, "quantity": 10000},
{"operation":"sell", "unit-cost":10.00, "quantity": 5000}]
```
Expected:
```json
[{"tax":0}, {"tax":10000}]
[{"tax":0}, {"tax":0}]
```
Result:
```json
[{"tax":0},{"tax":10000}] 
[{"tax":0},{"tax":0}]
```

# Case 1:
```json
[{"operation":"buy", "unit-cost":10.00, "quantity": 100},
{"operation":"sell", "unit-cost":15.00, "quantity": 50},
{"operation":"sell", "unit-cost":15.00, "quantity": 50}]
```
Expected:
```json
[{"tax": 0},{"tax": 0},{"tax": 0}]
```
Result:
```json
[{"tax":0},{"tax":0},{"tax":0}]
```

# Case 2:
```json
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
{"operation":"sell", "unit-cost":20.00, "quantity": 5000},
{"operation":"sell", "unit-cost":5.00, "quantity": 5000}]
```
Expected:
```json
[{"tax": 0.00},{"tax": 10000.00},{"tax": 0.00}]
```
Result:
```json
[{"tax":0},{"tax":10000},{"tax":0}]
```

# Case 1+2:
```json
[{"operation":"buy", "unit-cost":10.00, "quantity": 100},
{"operation":"sell", "unit-cost":15.00, "quantity": 50},
{"operation":"sell", "unit-cost":15.00, "quantity": 50}]
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
{"operation":"sell", "unit-cost":20.00, "quantity": 5000},
{"operation":"sell", "unit-cost":5.00, "quantity": 5000}]
```
Expected:
```json
[{"tax": 0.00},{"tax": 0.00},{"tax": 0.00}]
[{"tax": 0.00},{"tax": 10000.00},{"tax": 0.00}]
```
Result:
```json
[{"tax":0},{"tax":0},{"tax":0}]
[{"tax":0},{"tax":10000},{"tax":0}]
```

# Case 3:
```json
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
{"operation":"sell", "unit-cost":5.00, "quantity": 5000},
{"operation":"sell", "unit-cost":20.00, "quantity": 3000}]
```
Expected:
```json
[{"tax": 0.00},{"tax": 0.00},{"tax": 1000.00}]
```
Result:
```json
[{"tax":0},{"tax":0},{"tax":1000}]
```

# Case 4:
```json
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
{"operation":"buy", "unit-cost":25.00, "quantity": 5000},
{"operation":"sell", "unit-cost":15.00, "quantity": 10000}]
```
Expected:
```json
[{"tax": 0},{"tax": 0},{"tax": 0}]
```
Result:
```json
[{"tax":0},{"tax":0},{"tax":0}]
```

# Case 5:
```json
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
{"operation":"buy", "unit-cost":25.00, "quantity": 5000},
{"operation":"sell", "unit-cost":15.00, "quantity": 10000},
{"operation":"sell", "unit-cost":25.00, "quantity": 5000}]
```
Expected:
```json
[{"tax": 0.00},{"tax": 0.00},{"tax": 0.00},{"tax": 10000.00}]
```
Result:
```json
[{"tax":0},{"tax":0},{"tax":0},{"tax":10000}]
```

# Case 6:
```json
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
{"operation":"sell", "unit-cost":2.00, "quantity": 5000},
{"operation":"sell", "unit-cost":20.00, "quantity": 2000},
{"operation":"sell", "unit-cost":20.00, "quantity": 2000},
{"operation":"sell", "unit-cost":25.00, "quantity": 1000}]
```
Expected:
```json
[{"tax": 0.00},{"tax": 0.00},{"tax": 0.00},{"tax": 0.00},{"tax": 3000.00}]
```
Result:
```json
[{"tax":0},{"tax":0},{"tax":0},{"tax":0},{"tax":3000}]
```

# Case 7:
```json
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
{"operation":"sell", "unit-cost":2.00, "quantity": 5000},
{"operation":"sell", "unit-cost":20.00, "quantity": 2000},
{"operation":"sell", "unit-cost":20.00, "quantity": 2000},
{"operation":"sell", "unit-cost":25.00, "quantity": 1000},
{"operation":"buy", "unit-cost":20.00, "quantity": 10000},
{"operation":"sell", "unit-cost":15.00, "quantity": 5000},
{"operation":"sell", "unit-cost":30.00, "quantity": 4350},
{"operation":"sell", "unit-cost":30.00, "quantity": 650}]
```
Expected:
```json
[{"tax":0.00}, {"tax":0.00}, {"tax":0.00}, {"tax":0.00}, {"tax":3000.00}, {"tax":0.00}, {"tax":0.00}, {"tax":3700.00}, {"tax":0.00}]
```
Result:
```json
[{"tax":0},{"tax":0},{"tax":0},{"tax":0},{"tax":3000},{"tax":0},{"tax":0},{"tax":3700},{"tax":0}]
```

# Case 8:
```json
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
{"operation":"sell", "unit-cost":50.00, "quantity": 10000},
{"operation":"buy", "unit-cost":20.00, "quantity": 10000},
{"operation":"sell", "unit-cost":50.00, "quantity": 10000}]
```
Expected:
```json
[{"tax":0.00},{"tax":80000.00},{"tax":0.00},{"tax":60000.00}]
```
Result:
```json
[{"tax":0},{"tax":80000},{"tax":0},{"tax":60000}]
```

# Case 9 rounding:
```json
[{"operation":"buy", "unit-cost":20.00, "quantity": 10000},
{"operation":"buy", "unit-cost":10.00, "quantity": 5000},
{"operation":"sell", "unit-cost":16.67, "quantity": 15000}]
```
Expected:
```json
[{"tax": 0.00},{"tax": 0.00},{"tax": 0.00}]
```
Result:
```json
[{"tax":0},{"tax":0},{"tax":0}]
```