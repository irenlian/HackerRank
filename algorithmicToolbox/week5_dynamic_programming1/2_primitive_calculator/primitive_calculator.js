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

function getIJ(results, i, j, n) {
  if (results[i][j]) return results[i][j];
  const options = [];
  // check multiply by 3
  if (results[i - 1] && results[i - 1][j]) {
    if (results[i - 1][j] * 3 <= n) options.push(results[i - 1][j] * 3);
    else options.push(0);
  }
  // check multiply by 2
  if (results[i][j - 1]) {
    if (results[i][j - 1] * 2 <= n) options.push(results[i][j - 1] * 2);
    else options.push(0);
  }
  // check add 1
  if (results[i - 1] && results[i - 1][j - 1]) {
    if (results[i - 1][j - 1] + 1 <= n) options.push(results[i - 1][j - 1] + 1);
    else options.push(0);
  }
  return Math.max(...options);
}

function getPath(results, i, j) {
  const path = [];
  while (i >= 0 || j >= 0) {
    path.push(results[i][j]);
    if (results[i - 1] && results[i - 1][j] && results[i - 1][j] * 3 === results[i][j]) {
      i--;
    } else if (results[i][j - 1] && results[i][j - 1] * 2 === results[i][j]) {
      j--;
    } else {
      i--;
      j--;
    }
  }
  return path;
}

// O(n^2*logn)
function primitiveCalculator(n) {
  const results = [[1]];

  // fill the matrix with possible steps
  for (let i = 0; i < n; i++) {
    if (!results[i]) results[i] = [];
    for (let j = 0; j < i; j++) {
      results[i][j] = getIJ(results, i, j, n);
    }
    for (let k = 0; k <= i; k++) {
      results[k][i] = getIJ(results,k, i, n);
    }
  }

  let fastestPath = Array.from({length: n}, (_, i) => i + 1);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (results[i][j] === n) {
        const path = getPath(results, i, j);
        if (fastestPath.length > path.length) {
          fastestPath = path;
        }
      }
    }
  }
  return fastestPath;
}

module.exports = primitiveCalculator;
