const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', line => {
  const itemsCount = parseInt(line, 10);
  rl.once('line', line => {
    const parts = line.toString().split(' ');
    console.log(maximumSalary(parts));
    process.exit();
  });
});

function maximumSalary(parts) {
  parts.sort((a, b) => {
    let i = 0, j = 0;
    while (i < a.length || j < b.length) {
      if (a[i] !== b[j]) {
        return b[j] - a[i];
      }
      i++;
      j++;
      if (i === a.length && j < b.length) {
        i = 0;
      } else if (i < a.length && j === b.length) {
        j = 0;
      }
    }
    return 0;
  });

  return parts.join('');
}

module.exports = maximumSalary;
