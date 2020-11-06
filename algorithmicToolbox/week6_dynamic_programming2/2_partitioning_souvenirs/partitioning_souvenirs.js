const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
  rl.once('line', (line) => {
    const souvenirs = line.toString().split(' ').map(Number);

    console.log(partitioningSouvenirs(souvenirs));
    process.exit();
  });
});

// Trying to optimize the recursive calls
let memoization = [];

function checkValue(values, s1, s2, s3) {
  let res = 0;
  if (memoization[s1][s2][s3] > 0) {
    res = memoization[s1][s2][s3];
  } else {
    res = partitioningRecursive(values.slice(1), s1, s2, s3);
    memoization[s1][s2][s3] = res;
  }
  return res;
}

function partitioningRecursive(values, s1, s2, s3) {
  if (s1 === 0 && s2 === 0 && s3 === 0) {
    return 1;
  }
  if (!values.length) {
    return 0;
  }
  const results = [0];
  if (s1 - values[0] >= 0) {
    results.push(checkValue(values, s1 - values[0], s2, s3));
  }
  if (s2 - values[0] >= 0) {
    results.push(checkValue(values, s1, s2 - values[0], s3));
  }
  if (s3 - values[0] >= 0) {
    results.push(checkValue(values, s1, s2, s3 - values[0]));
  }
  return Math.max(...results);
}

function partitioningSouvenirs(values) {
  // check whether souvenirs can be divided at whole
  const sum = values.reduce((s, value) => s + value, 0);
  if (sum % 3 !== 0) return 0;

  memoization = Array(sum / 3 + 1).fill(-1);
  memoization = memoization.map(() => Array(sum / 3 + 1).fill(-1));
  memoization = memoization.map(() => [...memoization]);
  return partitioningRecursive(values, sum / 3, sum / 3, sum / 3);
}

module.exports = partitioningSouvenirs;
