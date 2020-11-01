const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
  const [capacity, barsNumber] = line.toString().split(' ').map(Number);
  rl.once('line', (line) => {
    const goldenBars = line.toString().split(' ').map(Number);

    console.log(maximumAmountOfGold(capacity, goldenBars));
    process.exit();
  });
});

function maximumAmountOfGold(capacity, bars) {
  const results = [new Array(capacity + 1).fill(0)];

  for (let i = 1; i <= bars.length; i++) {
    const barIndex = i - 1;
    results[i] = [0];
    for (let j = 1; j <= capacity; j++) {
      results[i][j] = results[i - 1][j];
      let previous = results[i - 1][j - bars[barIndex]];
      if (previous !== undefined
        && previous + bars[barIndex] <= capacity
        && previous + bars[barIndex] > results[i - 1][j]) {
        results[i][j] = previous + bars[barIndex];
      }
    }
  }

  return results[bars.length][capacity];
}

module.exports = maximumAmountOfGold;
