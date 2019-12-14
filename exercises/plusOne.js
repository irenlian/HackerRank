//https://www.interviewbit.com/problems/add-one-to-number/

function plusOne(A) {
  while (A[0] === 0 && A.length > 1) {
    A.shift();
  }
  A[A.length - 1]++;
  for (let i = A.length - 1; i >= 0; i--) {
    if (A[i] > 9 && i > 0) {
      A[i - 1]++;
      A[i] -= 10;
    } else if (A[i] > 9) {
      A[i] -= 10;
      A.unshift(1);
    } else {
      return A;
    }
  }
  return A;
}

console.log(plusOne([0]));
console.log(plusOne([0, 1, 2]));
console.log(plusOne([9, 9]));
