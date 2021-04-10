//https://leetcode.com/problems/longest-increasing-path-in-a-matrix

const MOVES = [[-1, 0], [0, -1], [1, 0], [0, 1]];

class Memo {
  memo;

  constructor() {
    this.memo = [];
  }

  setMemo(point, value) {
    if (!this.memo[point[0]]) {
      this.memo[point[0]] = [];
    }
    this.memo[point[0]][point[1]] = value;
  }

  getMemo(point) {
    if (!this.memo[point[0]] || !this.memo[point[0]][point[1]]) return null;
    return this.memo[point[0]][point[1]];
  }
}

function isOutside(matrix, point) {
  return (point[0] < 0 || point[0] >= matrix.length || point[1] < 0 || point[1] >= matrix[0].length);
}

function findPath(matrix, start, cache) {
  if (cache.getMemo(start) !== null) return cache.getMemo(start);

  let max = 1;
  for (let i = 0; i < MOVES.length; i += 1) {
    const move = MOVES[i];
    const destination = [start[0] + move[0], start[1] + move[1]];
    if (!isOutside(matrix, destination) && matrix[destination[0]][destination[1]] > matrix[start[0]][start[1]]) {
      max = Math.max(max, findPath(matrix, destination, cache) + 1);
    }
  }

  cache.setMemo(start, max);
  return max;
}

/*
* DFS + Memoization
* Time complexity O(mn) where m and n are the size of a matrix
* Space complexity O(mn)
*/
function longestIncreasingPath(matrix) {
  const cache = new Memo();
  let max = 1;
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[i].length; j += 1) {
      max = Math.max(max, findPath(matrix, [i, j], cache));
    }
  }
  return max;
};

const tests = [
  { parameters: [[[9,9,4],[6,6,8],[2,1,1]]], correctAnswer: 4 },
  { parameters: [[[3,4,5],[3,2,6],[2,2,1]]], correctAnswer: 4 },
  { parameters: [[[0]]], correctAnswer: 1 },
  { parameters: [[[1,2]]], correctAnswer: 2 },
];

tests.forEach((test) => {
  console.log(longestIncreasingPath(...test.parameters) === test.correctAnswer);
});
