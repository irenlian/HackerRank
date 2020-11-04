const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', line => {
  const itemsCount = parseInt(line, 10);

  const result = maximumNumberOfPrizes(itemsCount);

  console.log(result.length);
  for (let i = 0; i < result.length; i++) {
    process.stdout.write(result[i] + ' ');
  }

  process.stdout.write('\n');
  process.exit();
});

function maximumNumberOfPrizes(count) {
  const result = [];
  let sum = 0;
  let i = 1;

  while (sum + 2 * i + 1 <= count) {
    sum += i;
    result.push(i++);
  }

  if (count - sum) {
    result.push(count - sum);
  }

  return result;
}

module.exports = maximumNumberOfPrizes;
