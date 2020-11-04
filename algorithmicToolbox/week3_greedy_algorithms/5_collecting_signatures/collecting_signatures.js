const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', line => {
  const itemsCount = parseInt(line, 10);
  const items = [];
  let count = 0;

  rl.on('line', line => {
    items.push(readLine(line));

    if (++count >= itemsCount) {
      const result = collectingSignatures(items);

      console.log(result.length);
      for (let i = 0; i < result.length; i++) {
        process.stdout.write(result[i] + ' ');
      }

      process.stdout.write('\n');
      process.exit();
    }
  });
});

function readLine(line) {
  const v = parseInt(line.toString().split(' ')[0], 10);
  const w = parseInt(line.toString().split(' ')[1], 10);

  return [v, w];
}

function collectingSignatures(items) {
  const sorted = items.sort((a, b) => a[0] - b[0]);

  const result = [];
  let expectedLine = -1;
  for (let [start, end] of sorted) {
    if (expectedLine === -1 || end < expectedLine) {
      expectedLine = end;
    }
    if (expectedLine < start) {
      result.push(expectedLine);
      expectedLine = end;
    }
  }

  if (expectedLine !== -1) {
    result.push(expectedLine);
  }

  return result;
}

module.exports = collectingSignatures;
