// https://leetcode.com/problems/max-area-of-island/

const DIRECTIONS = [
  [-1,0],
  [0,-1],
  [1,0],
  [0,1],
];

function countIsland(grid, visited, start) {
  const m = grid.length;
  const n = grid[0].length;
  const stack = [start];
  let size = 0;
  while (stack.length) {
    const current = stack.pop();
    if (grid[current.i][current.j]) {
      size++;
      DIRECTIONS.forEach(dir => {
        const i = current.i + dir[0];
        const j = current.j + dir[1];
        if (i < m && j < n && i >= 0 && j >= 0 && !visited[i][j]) {
          visited[i][j] = true;
          stack.push({ i, j });
        }
      });
    }
  }
  return size;
}

function maxAreaOfIsland(grid) {
  let i = 0;
  let j = 0;
  const m = grid.length;
  const n = grid[0].length;
  const visited = Array.from(new Array(m)).map(() => new Array(n).fill(false));
  let maxSize = 0;
  while (i < m && j < n) {
    if (!visited[i][j]) {
      visited[i][j] = true;
      if (grid[i][j]) {
        maxSize = Math.max(maxSize, countIsland(grid, visited, { i, j }));
      }
    }
    if (j >= n - 1) {
      j = 0;
      i++;
    } else {
      j++;
    }
  }
  return maxSize;
};

console.log(maxAreaOfIsland([[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]) === 6);
console.log(maxAreaOfIsland([[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]) === 4);
console.log(maxAreaOfIsland([[0]]) === 0);
console.log(maxAreaOfIsland([[1,0],[0,1]]) === 1);
console.log(maxAreaOfIsland([[1,1,0],[1,1,0]]) === 4);
