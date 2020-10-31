const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', (aLength) => {
  rl.once('line', (line) => {
    const a = line.toString().split(' ').map(Number);
    rl.once('line', (bLength) => {
      rl.once('line', (line) => {
        const b = line.toString().split(' ').map(Number);
        rl.once('line', (cLength) => {
          rl.once('line', (line) => {
            const c = line.toString().split(' ').map(Number);
            console.log(longestCommonSubsequence(a, b, c));
            process.exit();
          });
        });
      });
    });
  });
});

function getIJK(a, b, c, results, i, j, k) {
  if (i > 0 && j > 0 && k > 0 && a[i - 1] === b[j - 1] && c[k - 1] === b[j - 1]) {
    return results[i - 1][j - 1][k - 1] + 1;
  }
  const options = [];
  if (i > 0) {
    options.push(results[i - 1][j][k]);
  }
  if (j > 0) {
    options.push(results[i][j - 1][k]);
  }
  if (k > 0) {
    options.push(results[i][j][k - 1]);
  }
  if (i > 0 && k > 0) {
    options.push(results[i - 1][j][k - 1]);
  }
  if (i > 0 && j > 0) {
    options.push(results[i - 1][j - 1][k]);
  }
  if (k > 0 && j > 0) {
    options.push(results[i][j - 1][k - 1]);
  }
  if (i > 0 && j > 0 && k > 0) {
    options.push(results[i - 1][j - 1][k - 1]);
  }
  return Math.max(...options);
}

// O(n^2)
function longestCommonSubsequence(a, b, c) {
  const results = [[[0]]];

  // fill the matrix with possible steps
  for (let i = 0; i <= a.length; i++) {
    if (!results[i]) results[i] = [];
    for (let j = 0; j <= b.length; j++) {
      if (!results[i][j]) results[i][j] = [];
      for (let k = 0; k <= c.length; k++) {
        if (i === 0 && j === 0 && k === 0) continue;
        results[i][j][k] = getIJK(a, b, c, results, i, j, k);
      }
    }
  }

  return results[a.length][b.length][c.length];
}

module.exports = longestCommonSubsequence;
