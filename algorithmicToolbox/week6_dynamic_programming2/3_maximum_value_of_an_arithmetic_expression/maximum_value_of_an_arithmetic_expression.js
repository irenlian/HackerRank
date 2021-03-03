const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
  const values = [], operations = [];

  for (let i = 0; i < line.length; i++) {
    if (i % 2 === 0) {
      values.push(parseInt(line[i], 10));
    } else {
      operations.push(line[i]);
    }
  }
  console.log(parentheses(values, operations));
  process.exit();
});

function calculate(n1, n2, op) {
  switch (op) {
    case '+':
      return n1 + n2;
    case '-':
      return n1 - n2;
    case '*':
      return n1 * n2;
  }
}

function minAndMax(i, j, operations, minMatrix, maxMatrix) {
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  for (let k = i; k < j; k++) {
    const a = calculate(maxMatrix[i][k], maxMatrix[k + 1][j], operations[k]);
    const b = calculate(maxMatrix[i][k], minMatrix[k + 1][j], operations[k]);
    const c = calculate(minMatrix[i][k], maxMatrix[k + 1][j], operations[k]);
    const d = calculate(minMatrix[i][k], minMatrix[k + 1][j], operations[k]);
    min = Math.min(min, a, b, c, d);
    max = Math.max(max, a, b, c, d);
  }

  return [min, max];
}

function parentheses(values, operations) {
  const minMatrix = [];
  const maxMatrix = [];

  for (let i = 0; i < values.length; i++) {
    minMatrix[i] = [];
    minMatrix[i][i] = values[i];
    maxMatrix[i] = [];
    maxMatrix[i][i] = values[i];
  }

  let j = 0;
  for (let s = 1; s < values.length; s++) {
    for (let i = 0; i < values.length - s; i++) {
      j = i + s;
      [minMatrix[i][j], maxMatrix[i][j]] = minAndMax(i, j, operations, minMatrix, maxMatrix);
    }
  }

  return maxMatrix[0][values.length - 1];
}

module.exports = parentheses;
