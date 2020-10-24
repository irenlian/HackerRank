const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', line => {
    const count = parseInt(line, 10);

    rl.on('line', line => {
        const items = line.toString().split(' ').map(Number);

        console.log(majorityElement(items));
        process.exit();
    });
});

// Time O(n)
function majorityElement(items) {
    const unique = {};
    items.forEach(elem => {
        if (unique[elem]) {
            unique[elem] = unique[elem] + 1;
        } else {
            unique[elem] = 1;
        }
    });

    let element = 0, quantity = 0;
    Object.keys(unique).forEach(el => {
        if (unique[el] > quantity) {
            quantity = unique[el];
            element = parseInt(el, 10);
        }
    });

    if (quantity > items.length / 2) return 1;
    return 0;
}

module.exports = majorityElement;
