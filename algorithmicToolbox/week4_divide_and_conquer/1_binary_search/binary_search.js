const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', line => {
    const arr = line.toString().split(' ').slice(1).map(Number);

    rl.once('line', line => {
        const keys = line.toString().split(' ').slice(1).map(Number);

        for (let key of keys) {
            process.stdout.write(binarySearch(arr, key) + ' ');
        }

        process.stdout.write('\n');
        process.exit();
    })
});

function binarySearch(arr = [], key, low = 0, high = arr.length) {
    if (high - low === 0) return -1;
    if (high - low === 1 && arr[low] !== key) return -1;

    const middlePoint = Math.floor((high - low) / 2) + low;
    if (arr[middlePoint] === key) {
      return middlePoint;
    } else if (arr[middlePoint] > key) {
      return binarySearch(arr, key, low, middlePoint);
    } else {
      return binarySearch(arr, key, middlePoint, high);
    }
}

module.exports = binarySearch;
