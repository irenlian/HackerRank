// https://www.interviewbit.com/problems/first-missing-integer/

// Decision using negative numbers as a mark
function firstMissingPositive(A) {
  for (let i = 0; i < A.length; i++) {
    if (A[i] < 0) A[i] = 0;
  }
  for (let i = 0; i < A.length; i++) {
    const abs = Math.abs(A[i]);
    if (abs !== 0 && abs <= A.length) {
      if (A[abs - 1] === 0) {
        A[abs - 1] = abs * -1;
      } else if (A[abs - 1] > 0) {
        A[abs - 1] = A[abs - 1] * -1;
      }
    }
  }
  for (let i = 0; i < A.length; i++) {
    if (A[i] >= 0) {
      return i + 1;
    }
  }
  return A.length + 1;
}

console.log(firstMissingPositive([1, 3, 5]));
console.log(firstMissingPositive([1]));
console.log(firstMissingPositive([1, 3, 5, -8, 6, 2]));
console.log(firstMissingPositive([1, 2, 3]));
console.log(firstMissingPositive([13, 14, 36, 19, 44, 1, 45, 4, 48, 23, 32, 16, 37, 44, 47, 28, 8, 47, 4, 31, 25, 48, 49, 12, 7, 8]));
