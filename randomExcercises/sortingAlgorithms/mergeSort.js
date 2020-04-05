function mergeSort(array) {
  if (array.length === 1) { return array; }
  const part1 = mergeSort(array.slice(0, Math.floor(array.length / 2)));
  const part2 = mergeSort(array.slice(Math.floor(array.length / 2)));
  const result = [];
  let i1 = 0; let
    i2 = 0;
  while (i1 < part1.length || i2 < part2.length) {
    if (i2 >= part2.length || (i1 < part1.length && part1[i1] <= part2[i2])) { result.push(part1[i1++]); } else { result.push(part2[i2++]); }
  }
  return result;
}

console.log(mergeSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]));
