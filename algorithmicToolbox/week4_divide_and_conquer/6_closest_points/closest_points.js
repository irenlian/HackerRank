const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', line => {
    const itemsCount = parseInt(line, 10);
    const items = [];
    let count = 0;

    rl.on('line', line => {
        const [x, y] = readLine(line);
        items.push([x, y]);

        if (++count >= itemsCount) {
            console.log(closestPoints(items));
            process.exit();
        }
    });
});

function readLine(line) {
    const v = parseInt(line.toString().split(' ')[0], 10);
    const w = parseInt(line.toString().split(' ')[1], 10);

    return [v, w];
}

function getSquaredDistance(a, b) {
  return Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2);
}

const numberOfPointsToCheck = 5;

function closestSubsequentPoints(items) {
  let closestDistance = Number.MAX_VALUE;

  for (let i = 0; i < items.length; i++) {
    // for each of the point we need to check only 5 subsequent point sorted by Y
    for (let j = i + 1; j < Math.min(items.length, i + numberOfPointsToCheck); j++) {
      if (i === j) continue;
      const d = getSquaredDistance(items[i], items[j]);
      if (d === 0) return d;
      if (d < closestDistance) {
        closestDistance = d;
      }
    }
  }

  return closestDistance;
}

function closestPointsRecursive(sortedByX, sortedByY, left = 0, right = sortedByX.length - 1) {
  if (left >= right) {
    return Number.MAX_VALUE;
  }
  if (right - left === 1) {
    return getSquaredDistance(sortedByX[left], sortedByX[right]);
  }

  const middlePoint = Math.floor((right - left) / 2) + left;
  // create smaller arrays to pass to recursive calls
  const leftByY = [], rightByY = [];
  sortedByY.forEach(item => {
    if (item[0] <= sortedByX[middlePoint][0]) leftByY.push(item);
    else rightByY.push(item);
  })

  const leftPart = closestPointsRecursive(sortedByX, leftByY, left, middlePoint);
  // return faster if we have found duplicated points
  if (leftPart === 0) return leftPart;
  const rightPart = closestPointsRecursive(sortedByX, rightByY, middlePoint + 1, right);
  const closestDistance = Math.min(leftPart, rightPart);
  if (closestDistance === 0) return closestDistance;

  // check the distance between points in the middle, select them with the X distance to the center no more than just founded
  const closestDistanceRoot = Math.pow(closestDistance, 1 / 2);
  const centerStrip = sortedByY.filter(item => Math.abs(item[0] - sortedByX[middlePoint][0]) < closestDistanceRoot);
  const centerPart = closestSubsequentPoints(centerStrip);

  return Math.min(closestDistance, centerPart);
}

/**
 * Complexity: 2nlogn + T(n)
 * T(n) = 2T(n/2) + O(5n)
 * According to Master theorem: O(nlogn)
 */

function closestPoints(items) {
  if (items.length <= 1) {
    return 0;
  }

  // sort points beforehand
  const sortedByX = [...items].sort((a, b) => a[0] - b[0]);
  const sortedByY = [...items].sort((a, b) => a[1] - b[1]);
  const squaredDistance = closestPointsRecursive(sortedByX, sortedByY);
  // during the search calculate only squared distance to make it faster, and take the square root only now
  const closestDistance = Math.pow(squaredDistance, 1 / 2);

  return Number.parseFloat(closestDistance).toFixed(4);
}

module.exports = closestPoints;
