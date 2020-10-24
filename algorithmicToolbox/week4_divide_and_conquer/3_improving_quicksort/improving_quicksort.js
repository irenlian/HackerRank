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

        const sorted = randomizedQuickSort(items, 0, items.length - 1);
        sorted.forEach((key, i) => process.stdout.write(key + (i !== sorted.length - 1 ? ' ' : '')));
        process.exit();
    });
});

const swap = (array, x, y) => {
  [array[x], array[y]] = [array[y], array[x]];
};

function partition3(items, left, right) {
  const x = items[left];
  let m1 = left;
  let m2 = left;
  for (let i = left + 1; i <= right; i++) {
    if (items[i] < x) {
      m1++;
      swap(items, i, m1);
      if (items[i] !== x) m2++;
    }
    if (items[i] === x) {
      m2++;
      swap(items, i, m2);
    }
  }
  swap(items, left, m1);

  return [m1, m2];
}

function partition2(items, left, right) {
  const x = items[left];
  let j = left;
  for (let i = left + 1; i <= right; i++) {
    if (items[i] <= x) {
      j++;
      swap(items, i, j);
    }
  }
  swap(items, left, j);
  return j;
}

function randomizedQuickSort(items, left = 0, right = items.length - 1) {
  if (left >= right) {
    return items;
  }
  const k = Math.ceil(Math.random() * 10 * right) % (right - left + 1) + left;
  swap(items, left, k);
  //use partition3
  const [m1, m2] = partition3(items, left, right);
  randomizedQuickSort(items, left, m1 - 1);
  randomizedQuickSort(items, m2 + 1, right);
  return items;
}

module.exports = randomizedQuickSort;
