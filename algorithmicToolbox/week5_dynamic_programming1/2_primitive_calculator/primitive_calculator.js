const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
  const result = primitiveCalculator(parseInt(line, 10));
  console.log(result.length - 1);
  for (let i = result.length - 1; i >= 0; i--) {
    process.stdout.write(result[i] + ' ');
  }

  process.stdout.write('\n');
  process.exit();
}

function getI(results, i) {
  const options = [];
  // check multiply by 3
  if (i % 3 === 0) {
    options.push(results[i / 3] + 1);
  }
  // check multiply by 2
  if (i % 2 === 0) {
    options.push(results[i / 2] + 1);
  }
  // check add 1
  options.push(results[i - 1] + 1);
  return Math.min(...options);
}

function getPath(results, i) {
  const path = [];
  while (i > 0) {
    path.push(i);
    if (i % 3 === 0 && results[i] - results[i / 3] === 1) {
      i = i / 3;
    } else if (i % 2 === 0 && results[i] - results[i / 2] === 1) {
      i = i / 2;
    } else {
      i--;
    }
  }
  return path;
}

// O(n)
function primitiveCalculator(n) {
  const results = [0, 0];

  // fill the array with possible steps
  for (let i = 2; i <= n; i++) {
    results[i] = getI(results, i);
  }

  return getPath(results, n);
}

module.exports = primitiveCalculator;
