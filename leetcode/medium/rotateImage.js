// https://leetcode.com/problems/rotate-image

function rotate(matrix) {
  const n = matrix.length;
  const m = matrix.length - 1;
  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = 0; j < n / 2; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[m - j][i];
      matrix[m - j][i] = matrix[m - i][m - j];
      matrix[m - i][m - j] = matrix[j][m - i];
      matrix[j][m - i] = temp;
    }
  }
};
let m = [[1,2],[3,4]];
rotate(m)
console.log(m);

m = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]];
rotate(m)
console.log(m);

m = [[5,1,9,11,17],[2,4,8,10,18],[13,3,6,7,19],[15,14,12,16,20],[21,22,23,24,25]];
rotate(m)
console.log(m);

m = [[1,2,3],[4,5,6],[7,8,9]];
rotate(m)
console.log(m);
