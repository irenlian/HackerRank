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

        console.log(randomizedQuickSort(items, 0, items.length - 1));
        process.exit();
    });
});

function partition3(items, left, right) {
  //write your code here


  const m1 = left;
  const m2 = right;
  const m = [m1, m2];
  return m;
}

function partition2(items, left, right) {
  const x = items[left];
  let j = left;
  for (let i = left + 1; i <= right; i++) {
    if (items[i] <= x) {
      j++;
      const t = items[i];
      items[i] = items[j];
      items[j] = t;
    }
  }
  const t = items[left];
  items[left] = items[j];
  items[j] = t;
  return j;
}

function randomizedQuickSort(items, left, right) {
  if (left >= right) {
    return;
  }
  const k = Math.ceil(Math.random() * 10 * right) % (right - left + 1) + left;
  const t = items[left];
  items[left] = items[k];
  items[k] = t;
  //use partition3
  const m = partition2(items, left, right);
  randomizedQuickSort(items, left, m - 1);
  randomizedQuickSort(items, m + 1, right);
  return items;
}

module.exports = randomizedQuickSort;
