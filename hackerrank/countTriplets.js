//https://www.hackerrank.com/challenges/count-triplets-1/problem

function countTriplets(arr, r) {
  // store here counted values from arr
  // splitted by order
  const dictionary = [[]];
  // sum values
  const map = [];
  let currentValue = 1;
  let currentPower = 0;

  for (let value of arr) {
    if (value < currentValue) {
      while (value < currentValue) {
        currentPower--;
        currentValue = Math.pow(r, currentPower);
      }
      dictionary.push(map.slice(0, currentPower));
    }
    if (value > currentValue) {
      while (value > currentValue) {
        currentValue *= r;
        currentPower++;
      }
    }
    if (value === currentValue) {
      for (let batch of dictionary) {
        if (!batch[currentPower + 1]) {
          batch[currentPower] = (batch[currentPower] || 0) + 1;
        }
      }
      map[currentPower] = (map[currentPower] || 0) + 1;
    }
  }

  let count = 0;
  for (let batch of dictionary) {
    for (let i = 0; i < batch.length - 2; i++) {
      count += (batch[i] || 0) * (batch[i + 1] || 0) * (batch[i + 2] || 0);
    }
  }
  return count;
}

// function countTriplets(arr, r) {
//   let count = 0;
//   let i, j, k = 0;
//   while (i < arr.length - 2) {
//     let power = 0;
//     let value = 1;
//     while (arr[i] !== value) {
//       power++;
//       value = Math.pow(r, power);
//     }
//   }
//   return count;
// }

// console.log(countTriplets([1, 2, 2, 4], 2));
console.log(countTriplets([2, 4, 8, 16, 8, 8], 2));// expected 4
console.log(countTriplets([2, 4, 8, 2], 2));// expected 1
