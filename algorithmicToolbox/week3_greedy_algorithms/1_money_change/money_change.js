const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
    console.log(moneyChange(parseInt(line, 10)));
    process.exit();
}

function moneyChange(n) {
    return Math.floor(n / 10) + Math.floor(n % 10 / 5) + n % 10 % 5;
}

module.exports = moneyChange;
