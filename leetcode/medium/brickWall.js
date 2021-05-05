//https://leetcode.com/problems/brick-wall
function leastBricks(wall) {
  let minimumCrossed = wall.length;
  let crossed = 0;
  const queue = [];
  let addedBricks = wall.length;
  // Preparation
  for (let i = 0; i < wall.length; i++) {
    const brick = wall[i][0];
    if (!queue[brick - 1]) {
      queue[brick - 1] = [];
    }
    queue[brick - 1].push({ i, j: 1 });
  }
  // Cycle
  while (queue.length) {
    const newBricks = queue.shift();
    if (!newBricks) continue;
    crossed = crossed + addedBricks - newBricks.length;
    addedBricks = newBricks.length;
    for (let k = 0; k < newBricks.length; k++) {
      const coordinates = newBricks[k];
      const brick = wall[coordinates.i][coordinates.j];
      if (!queue[brick - 1]) {
        queue[brick - 1] = [];
      }
      queue[brick - 1].push({ i: coordinates.i, j: coordinates.j + 1 });
    }
    if (queue.length) minimumCrossed = Math.min(minimumCrossed, crossed);
  }
  return minimumCrossed;
};

console.log(leastBricks([[2,3],[3,2],[5],[1,1,3]]) === 2);
console.log(leastBricks([[2,3],[3,2],[5]]) === 2);
console.log(leastBricks([[2,3],[2,1,2]]) === 0);
console.log(leastBricks([[2,1,2],[2,1,2]]) === 0);
console.log(leastBricks([[2,2],[2,2]]) === 0);
console.log(leastBricks([[2],[2]]) === 2);
console.log(leastBricks([[2]]) === 1);
console.log(leastBricks([[1]]) === 1);
console.log(leastBricks([
  [1,2,2,1],
  [3,1,2],
  [1,3,2],
  [2,4],
  [3,1,2],
  [1,3,1,1]
]) === 2);
