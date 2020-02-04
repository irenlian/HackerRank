// https://www.interviewbit.com/problems/prettyprint/

function prettyPrint(A) {
  let ar = [];
  for (let i = 0; i < A * 2 - 1; i++) {
    ar[i] = [];
    for (let j = 0; j < A * 2 - 1; j++) {
      const colValue = Math.max(i + 1, A) - Math.min(i, A - 1);
      const rowValue = Math.max(j + 1, A) - Math.min(j, A - 1);
      ar[i].push(Math.max(colValue, rowValue));
    }
  }
  return ar;
}


console.log(prettyPrint(3));
