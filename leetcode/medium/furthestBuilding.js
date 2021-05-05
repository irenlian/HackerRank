// https://leetcode.com/problems/furthest-building-you-can-reach/
function furthestBuilding(heights, bricks, ladders) {
  const buildings = [];
  let usedBricks = 0;
  for (let i = 1; i < heights.length; i++) {
    const diff = heights[i] - heights[i - 1];
    if (diff < 0) continue;

    const min = buildings.length ? buildings.reduce((min, val, i) => val < buildings[min] ? i : min, 0) : 0;
    if (buildings.length < ladders) {
      buildings.push(diff);
    } else if (buildings[min] < diff) {
      usedBricks += buildings[min];
      buildings.splice(min, 1, diff);
    } else {
      usedBricks += diff;
    }
    if (usedBricks > bricks) return i - 1;
  }

  return heights.length - 1;
};

console.log(furthestBuilding(
  [4,2,7,6,9,14,12, 1, 4, 3,6],
9,
2
) === 10);

console.log(furthestBuilding(
  [4,2,7,6,9,14,12],
5,
1
) === 4);

console.log(furthestBuilding(
  [4,12,2,7,3,18,20,3,19],
10,
2
) === 7);

console.log(furthestBuilding(
  [14,3,19,3],
17,
0
) === 3);
