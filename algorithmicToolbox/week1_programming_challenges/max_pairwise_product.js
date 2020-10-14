const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', () => {
    rl.on('line', readLine);
});

function readLine (line) {
    const arr = line.toString().split(' ').map(Number);

    console.log(max(arr));
    process.exit();
}

// find the maximum product of two numbers from the array
function max(arr) {
    let firstBiggestNumber = 0;
    let secondBiggestNumber = 0;

    arr.forEach(n => {
      if (n > firstBiggestNumber) {
        secondBiggestNumber = Math.max(firstBiggestNumber, secondBiggestNumber);
        firstBiggestNumber = n;
      } else if (n > secondBiggestNumber) {
        secondBiggestNumber = n;
      }
    });

    return firstBiggestNumber * secondBiggestNumber;
}

module.exports = max;
