// https://leetcode.com/problems/number-of-submatrices-that-sum-to-target

/*
 * Time Complexity: O(R*R*C)
 * Space Complexity: O(RC)
 */
function numSubmatrixSumTarget(matrix, target) {
  const rows = matrix.length;
  const columns = matrix[0].length;
  // Computation of prefix matrix to be able to get sum of any submatrix in O(1)
  // Adding one additional row and column to not make exclusions for the first row and column
  const ps = Array.from(new Array(rows + 1)).map(() => new Array(columns + 1).fill(0));
  for (let i = 1; i < rows + 1; i += 1) {
    for (let j = 1; j < columns + 1; j += 1) {
      ps[i][j] = ps[i - 1][j] + ps[i][j - 1] - ps[i - 1][j - 1] + matrix[i - 1][j - 1];
    }
  }
  // Fix row start and row end to be able to calculate submatrices between freely
  let count = 0;
  for (let r1 = 1; r1 < rows + 1; r1 += 1) {
    for (let r2 = r1; r2 < rows + 1; r2 += 1) {
      // Use the hash map to remember the number of cells when the previous sum was equal the key
      let map = { 0: 1 };
      for (let c = 1; c < columns + 1; c += 1) {
        const sum = ps[r2][c] - ps[r1 - 1][c];
        // Right now the end of submatrix is fixed
        // To determine the possible start we need to understand where before we saw sum that is equal current sum - target
        // because in this case the sum of cells between will be target
        // So we get this value from the map
        if (map[sum - target]) {
          count += map[sum - target];
        }
        map[sum] = (map[sum] || 0) + 1;
      }
    }
  }
  return count;
};

const tests = [
  { params: [[[0,1,0],[1,1,1],[0,1,0]], 0], output: 4 },
  { params: [[[0,1,0],[1,1,1],[0,1,0]], 4], output: 4 },
  { params: [[[0,1,0],[1,1,1],[0,1,0]], 3], output: 6 },
];
tests.forEach(test => console.log(numSubmatrixSumTarget(...test.params) === test.output));

