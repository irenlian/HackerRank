const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', line => {
    const [itemsCount, knapsackCapacity] = line.toString().split(' ').map(Number);
    const items = [];
    let count = 0;

    rl.on('line', line => {
        const [v, w] = readLine(line);
        // Here we calculate price during receiving the input
        items.push({ value: v, weight: w, pricePerWeight: v / w || 0 });

        if (++count >= itemsCount) {
            console.log(maxLoot(itemsCount, knapsackCapacity, items));
            process.exit();
        }
    });
});

function readLine(line) {
    const v = parseInt(line.toString().split(' ')[0], 10);
    const w = parseInt(line.toString().split(' ')[1], 10);

    return [v, w];
}

// This algorithm has complexity of O(nlogn)
// The algorithm with complexity of Big Omega - n, O(n^2) is represented in stressTest file as naive
function maxLoot(count, capacity, items) {
  items.sort((a, b) => b.pricePerWeight - a.pricePerWeight);

  let loot = 0, capacityLeft = capacity, i = 0;
  while (capacityLeft > 0 && i < items.length) {
    loot += items[i].value * Math.min(capacityLeft / items[i].weight, 1);
    capacityLeft -= items[i].weight;
    i++;
  }
  return Number.parseFloat(loot).toFixed(4);
}

module.exports = maxLoot;
