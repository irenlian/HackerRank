// https://www.hackerrank.com/challenges/max-array-sum/problem
const fs = require('fs');

function mergeSort(array) {
  if (array.length === 1) { return array; }
  const part1 = mergeSort(array.slice(0, Math.floor(array.length / 2)));
  const part2 = mergeSort(array.slice(Math.floor(array.length / 2)));
  const result = [];
  let i1 = 0; let
    i2 = 0;
  while (i1 < part1.length || i2 < part2.length) {
    if (i2 >= part2.length || (i1 < part1.length && part1[i1].value >= part2[i2].value)) { result.push(part1[i1++]); } else { result.push(part2[i2++]); }
  }
  return result;
}

function calcSum(arr, eliminatedIndex) {
  const used = [];
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].value < 0 && i !== 0) { break; }
    if (arr[i].index !== eliminatedIndex && used.indexOf(arr[i].index + 1) === -1 && used.indexOf(arr[i].index - 1) === -1) {
      sum += arr[i].value;
      used.push(arr[i].index);
    }
  }
  return sum;
}

function maxSubsetSum(arr) {
  let sum = 0;
  let temp = arr.map((value, index) => ({ index, value }));
  const sorted = mergeSort(temp);
  sum = calcSum(sorted, -1);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].value < 0 && i !== 0) { break; }
    temp = calcSum(sorted, i);
    if (temp > sum) { sum = temp; }
  }
  return sum;
}

console.log(maxSubsetSum([-2, 1, 3, -4, 5]) === 8);
console.log(maxSubsetSum([2, 1, 5, 8, 4]) === 11);
const readLine = fs.readFileSync('../inputs/input00.txt', 'utf8');
const arr = readLine.split(' ').map((arrTemp) => parseInt(arrTemp, 10));
console.log(maxSubsetSum(arr) === 151598486);
