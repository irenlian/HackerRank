const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
  console.log(moneyChangeAgain(parseInt(line, 10)));
  process.exit();
}

// First approach O(m * c^2) where m - is initial money to change and c - coins options (3 in our case)
function moneyChange(n) {
  const coins = [4, 3, 1];
  const matrix = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < coins.length; j++) {
      for (let k = 0; k < coins.length; k++) {
        const previousValue = matrix[i - 1] ? matrix[i - 1][k] : 0;
        if (previousValue + coins[j] === n) {
          return i + 1;
        }
        if (!matrix[i]) {
          matrix[i] = [];
        }
        if (!matrix[i][j] || matrix[i][j] < previousValue + coins[j] || matrix[i][j] > n) {
          matrix[i][j] = previousValue + coins[j];
        }
      }
    }
  }
}

// Second approach O(m * c) where m - is initial money to change and c - coins options (3 in our case)
function moneyChangeAgain(n) {
  const coins = [4, 3, 1];
  const moneyArray = [0];

  for (let i = 1; i <= n; i++) {
    moneyArray[i] = Number.MAX_VALUE;
    for (let j = 0; j < coins.length; j++) {
      if (i >= coins[j]) {
        const numCoins = moneyArray[i - coins[j]] + 1;
        if (numCoins < moneyArray[i]) {
          moneyArray[i] = numCoins;
        }
      }
    }
  }
  return moneyArray[n];
}

module.exports = moneyChangeAgain;
