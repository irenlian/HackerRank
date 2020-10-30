const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', line => {
  const [rangesCount, betsCount] = line.toString().split(' ').map(Number);
  const ranges = [];
  let count = 0;

  rl.on('line', line => {
    count++;
    if (count <= rangesCount) {
      ranges.push(readLine(line));
    }
    if (count >= rangesCount) {
      rl.on('line', line => {
        const bets = line.toString().split(' ').map(Number);
        const result = organizingLottery(ranges, bets);
        for (let rangesCount of result) {
          process.stdout.write(rangesCount + ' ');
        }

        process.stdout.write('\n');
        process.exit();
      });
    }
  });
});

function readLine(line) {
    const l = parseInt(line.toString().split(' ')[0], 10);
    const h = parseInt(line.toString().split(' ')[1], 10);

    return [l, h];
}

// modified binary search
// key - 0 for upper bound or 1 for the lower one
function findBound(array, key, bet, left = 0, right = array.length - 1) {
  if (left >= right && key === 0) return array[left][key] <= bet && (!array[left + 1] || array[left + 1][key] > bet) ? left + 1 : left;
  if (left >= right && key === 1) return array[left][key] >= bet && (!array[left - 1] || array[left - 1][key] < bet) ? left - 1 : left;

  const middle = Math.floor((right - left) / 2) + left;
  if (array[middle][key] > bet || (array[middle][key] === bet && key === 1)) return findBound(array, key, bet, left, middle);
  else return findBound(array, key, bet, middle + 1, right);
}

function findIntersectingRanges(sortedByStart, sortedByEnd, bet) {
  const higherThanBet = findBound(sortedByStart, 0, bet);
  const lowerThanBet = findBound(sortedByEnd, 1, bet);

  return higherThanBet - lowerThanBet - 1;
}

function organizingLottery(ranges, bets) {
  const sortedByStart = [...ranges].sort((a, b) => a[0] - b[0]);
  const sortedByEnd = [...ranges].sort((a, b) => a[1] - b[1]);
  const results = [];

  bets.forEach(bet => {
    results.push(findIntersectingRanges(sortedByStart, sortedByEnd, bet));
  })

  return results;
}

module.exports = organizingLottery;
