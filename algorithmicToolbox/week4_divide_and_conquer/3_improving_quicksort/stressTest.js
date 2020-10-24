const quicksort = require("./improving_quicksort");
const quicksortNaive = require("../../../randomExcercises/sortingAlgorithms/quickSort");

function isEqual(array1, array2) {
  return array1.length === array2.length && array1.every(function(value, index) {
    return value === array2[index]
  })
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  while (true) {
    let count = Math.floor(Math.random() * 100000) + 1;
    let array = [];
    for (let i = 0; i < count; i++) {
      array.push(Math.floor(Math.random() * 20) + 1);
    }

    const res1 = quicksort([...array]);
    const res2 = quicksortNaive([...array]);
    const res3 = [...array].sort((a, b) => a - b);

    console.log(count);
    if (!isEqual(res1, res2) || !isEqual(res1, res3)) {
      console.log(array);
      console.log(`Wrong answer: ${res1} ${res2}`);
      break;
    } else {
      console.log('OK');
    }
  }
  process.exit();
}

stressTest();
