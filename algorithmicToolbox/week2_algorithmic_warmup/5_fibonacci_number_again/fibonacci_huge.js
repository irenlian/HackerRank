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

        console.log(getFibMod(n, m));
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
function getFibMod(n, m) {
    const { index, fibMod } = getPisanoPeriod(n, m);
    return fibMod[n % index];
}

module.exports = getFibMod;
