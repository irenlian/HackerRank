// https://leetcode.com/problems/pacific-atlantic-water-flow/
const DIRECTIONS = [[0, 1], [1, 0], [-1, 0], [0, -1]];

function pacificAtlantic(matrix) {
  if (!matrix.length || !matrix[0].length) return [];
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  const pacificQueue = [];
  const atlanticQueue = [];
  for (let i = 0; i < numCols; i++) {
    pacificQueue.push([0, i]);
    atlanticQueue.push([numRows - 1, i]);
  }

  for (let i = 0; i < numRows; i++) {
    pacificQueue.push([i, 0]);
    atlanticQueue.push([i, numCols - 1]);
  }

  const reachablePacific = bfs(pacificQueue, matrix);
  const reachableAtlantic = bfs(atlanticQueue, matrix);

  const answer = [];
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (reachablePacific[i] && reachableAtlantic[i] && reachablePacific[i][j] && reachableAtlantic[i][j]) {
        answer.push([i, j]);
      }
    }
  }
  return answer;
};

function bfs(queue, matrix) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  const reachable = [];
  while (queue.length) {
    const cell = queue.shift();
    if (!reachable[cell[0]]) reachable[cell[0]] = [];
    reachable[cell[0]][cell[1]] = true;
    for (let dir of DIRECTIONS) {
      const newRow = cell[0] + dir[0];
      const newCol = cell[1] + dir[1];

      if (newRow < 0 || newRow >= numRows || newCol < 0 || newCol >= numCols) {
        continue;
      }

      if (reachable[newRow] && reachable[newRow][newCol]) {
        continue;
      }

      if (matrix[newRow][newCol] < matrix[cell[0]][cell[1]]) {
        continue;
      }

      queue.push([newRow, newCol]);
    }
  }

  return reachable;
}

console.log(pacificAtlantic([[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]))
