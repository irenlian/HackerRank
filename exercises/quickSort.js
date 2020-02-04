// start and end points to indexes of array between which needs sorting.
function quickSort(array, start = 0, end = array.length - 1) {
  if (array.length <= 1 || start >= end) { return array; }
  const swap = (x, y) => {
    [array[x], array[y]] = [array[y], array[x]];
  };
  const pivot = array[end];
  // partitionIndex - index that breaking array for two parts less and greater than pivot.
  // starts from left and incremented after each swap
  let partitionIndex = start;
  for (let i = start; i < end; i++) {
    if (array[i] < pivot) {
      swap(i, partitionIndex++);
    }
  }
  // The element at the partitionIndex is guaranteed to be greater than or equal to pivot.
  // All elements to the left of partitionIndex are guaranteed to be less than pivot.
  // Swapping the pivot with the partitionIndex therefore places the pivot in its
  // final sorted position.
  swap(end, partitionIndex);
  // Sorting recursively two parts from partitionIndex
  quickSort(array, start, partitionIndex - 1);
  quickSort(array, partitionIndex + 1, end);
  return array;
}

// test array:
console.log(quickSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]));
