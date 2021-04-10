// https://leetcode.com/problems/advantage-shuffle/

function findIndexBiggerElement(array, n) {
  if (array[0] <= n) return array.length - 1;
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i + 1] <= n) return i;
  }
  return array.length - 1;
}

function advantageCount(A, B) {
  const a = [...A].sort((a, b) => b - a);
  for (let i = 0; i < B.length; i++) {
    let index = findIndexBiggerElement(a.slice(i), B[i]);
    index += i;
    const elem = a[index];
    a.splice(index, 1);
    a.splice(i, 0, elem);
  }
  return a;
}

function equals(array1, array2) {
  return array1.length === array2.length && array1.every((value, index) => value === array2[index])
}

console.log(advantageCount([3,1,1,5], [6,0,4,0]));
console.log(equals(advantageCount([2,7,11,15], [1,10,4,11]), [2,11,7,15]));
console.log(equals(advantageCount([3,1,1,5], [6,0,4,0]), [3,1,5,1]));
