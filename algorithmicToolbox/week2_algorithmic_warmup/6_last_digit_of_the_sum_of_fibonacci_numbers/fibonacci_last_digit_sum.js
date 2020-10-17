const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
    console.log(getFibLastDigitOfSum(parseInt(line, 10)));
    process.exit();
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

// Algorithm that uses the Pisano period
function getFibLastDigitOfSum(n) {
    const m = 10;
    const { index, fibMod } = getPisanoPeriod(n, m);
    let partialSum = 0;
    for (let i = 0; i <= n % index; i++) {
        partialSum += fibMod[i];
    }
    return partialSum % m;
}

module.exports = getFibLastDigitOfSum;
