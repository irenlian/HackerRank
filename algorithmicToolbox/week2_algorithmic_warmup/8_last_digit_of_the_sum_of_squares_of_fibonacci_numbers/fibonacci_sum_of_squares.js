const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
    console.log(getFibSumOfSquares(parseInt(line, 10)));
    process.exit();
}

function fib(n) {
  let n1 = 1, n2 = 0;
  let index = 1;

  if (n <= 1) return { n1, n2 };

  while (index++ < n) {
    const fibNumber = n1 + n2;
    n2 = n1;
    n1 = fibNumber;
  }
  return { n1, n2 };
}

function getPisanoPeriod(n, m) {
    let index = 1;
    let fibMod = [0 % m, 1 % m];

    while (index++ < n) {
        fibMod[index] = (fibMod[index - 1] + fibMod[index - 2]) % m;
        if (fibMod[index - 1] === 1 && fibMod[index] === 0) {
            break;
        }
    }
    return { index, fibMod };
}

function getFibSumOfSquares(n) {
    const { index, fibMod } = getPisanoPeriod(n + 1, 10);
    return (fibMod[n % index] * fibMod[(n + 1) % index]) % 10;
}

module.exports = getFibSumOfSquares;
