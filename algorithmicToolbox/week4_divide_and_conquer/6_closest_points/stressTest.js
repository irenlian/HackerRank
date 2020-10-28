const closestPoints = require("./closest_points");

function closestPointsNaive(items) {
  let closestDistance = Number.MAX_VALUE;

  for (let i = 0; i < items.length; i++) {
    for (let j = i; j < items.length; j++) {
      if (i === j) continue;
      const xDiff = Math.pow(items[i][0] - items[j][0], 2);
      const yDiff = Math.pow(items[i][1] - items[j][1], 2);
      const d = Math.pow(xDiff + yDiff, 1/2);
      if (d < closestDistance) {
        closestDistance = d;
      }
    }
  }

  return Number.parseFloat(closestDistance).toFixed(4);
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  while (true) {
    const itemsCount = Math.floor(Math.random() * 1000) + 2;
    const items = [];
    for (let i = 0; i < itemsCount; i++) {
      items.push([Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)]);
    }
    // const items = [[0, 0], [3, 4]];
    // const items = [[7, 7], [1, 100], [4, 8], [7, 7]];
    // const items = [ [ 94, 38 ], [ 1, 45 ], [ 72, 81 ], [ 4, 91 ], [ 97, 95 ] ];

    const res1 = closestPointsNaive(items);
    const res2 = closestPoints(items);

    // console.log(itemsCount);
    if (Math.abs(parseFloat(res1) - parseFloat(res2)) > 0.001) {
      console.log(items);
      console.log(`Wrong answer: ${res1} ${res2}`);
      break;
    } else {
      console.log('OK');
    }
  }
  process.exit();
}

stressTest();
