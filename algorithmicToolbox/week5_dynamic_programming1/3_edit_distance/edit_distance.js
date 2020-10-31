const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
  const a = line;
  rl.once('line', (b) => {
    console.log(editDistance(a, b));
    process.exit();
  });
});

function getIJ(a, b, results, i, j) {
  if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
    return results[i - 1][j - 1];
  }
  const options = [];
  if (i > 0) {
    options.push(results[i - 1][j] + 1);
  }
  if (j > 0) {
    options.push(results[i][j - 1] + 1);
  }
  if (i > 0 && j > 0) {
    options.push(results[i - 1][j - 1] + 1);
  }
  return Math.min(...options);
}

function editDistance(a, b) {
  const results = [[0]];

  // fill the array with possible steps
  for (let i = 0; i <= a.length; i++) {
    if (!results[i]) results[i] = [];
    for (let j = 0; j <= b.length; j++) {
      if (i === 0 && j === 0) continue;
      results[i][j] = getIJ(a, b, results, i, j);
    }
  }

  return results[a.length][b.length];
}

module.exports = editDistance;
