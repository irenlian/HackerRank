const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
    console.log(fib(parseInt(line, 10)));
    process.exit();
}

function fib(n) {
    let n1 = 1, n2 = 0;
    let index = 2;

    if (n === 1) return n2;
    if (n === 2) return n1;

    while (index++ < n) {
        const fibNumber = n1 + n2;
        n2 = n1;
        n1 = fibNumber;
    }
    return n1;
}

module.exports = fib;
