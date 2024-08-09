# Stock Tax Calculator
This is a simple stock tax calculator that calculates the tax on the sale of stocks. It is based on the FIFO (First In First Out) method. The user can input the stock transactions and the calculator will output the tax on the sale of the stocks.
## How to run
To run the program you need to have node version 14+ installed.
Execute the following command in the terminal:
```bash
node src/index.js  
```
## Input limitation
Due to ease of implementation and focus on the solution, please add inline arrays when inputting the stock transactions. For example:
```json
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000}, {"operation":"sell", "unit-cost":20.00, "quantity": 5000}, {"operation":"sell", "unit-cost":5.00, "quantity": 5000}]
[{"operation":"buy", "unit-cost":15.00, "quantity": 10000}, {"operation":"sell", "unit-cost":5.00, "quantity": 5000}, {"operation":"sell", "unit-cost":5.00, "quantity": 5000}]
```
The expected output from above execution would be:
```json
[{"tax":0},{"tax":10000},{"tax":0}]
[{"tax":0},{"tax":0},{"tax":0}]
```
## Sample data
The sample data is located in the `/src/data/` folder.
Execute one of the following commands in the terminal to test the sample data:
```bash 
node src/index.js < data/case-01.txt
node src/index.js < data/case-02.txt
node src/index.js < data/case-01+02.txt
node src/index.js < data/case-03.txt
node src/index.js < data/case-04.txt
node src/index.js < data/case-05.txt
node src/index.js < data/case-06.txt
node src/index.js < data/case-07.txt
node src/index.js < data/case-08.txt
node src/index.js < data/case-09.txt
```

## Testing
To run the tests execute the following command in the terminal:
```bash
yarn install && yarn test
```