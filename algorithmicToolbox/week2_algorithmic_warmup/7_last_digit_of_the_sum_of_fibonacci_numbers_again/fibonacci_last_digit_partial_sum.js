const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
  if (line !== "\n") {
    const n = parseInt(line.toString().split(' ')[0], 10);
    const m = parseInt(line.toString().split(' ')[1], 10);

    console.log(getFibLastDigitOfPartialSum(n, m));
    process.exit();
  }
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
function getFibLastDigitOfPartialSum(k, n) {
    const m = 10;
    const { index, fibMod } = getPisanoPeriod(n, m);
    let partialSum = 0;
    let start = k % index;

    if (k % index > n % index) {
        start = 0;
        for (let i = k % index; i <= index; i++) {
            partialSum += fibMod[i];
        }
    }

    for (let i = start; i <= n % index; i++) {
        partialSum += fibMod[i];
    }
    return partialSum % m;
}

module.exports = getFibLastDigitOfPartialSum;
