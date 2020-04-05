// https://www.interviewbit.com/problems/grid-unique-paths/

function path(x, y, A, B) {
  if (x >= A || y >= B) return 0;
  if (x === A - 1 || y === B - 1) return 1;
  return path(x + 1, y, A, B) + path(x, y + 1, A, B);
}

function uniquePaths(A, B) {
  return path(0, 0, A, B);
}

console.log(uniquePaths(3, 2));
