const getNumberOfInversions = require("./number_of_inversions");

function getNumberOfInversionsNaive(array) {
  let inversions = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j]) {
        inversions++;
      }
    }
  }
  return { inversions, array };
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */

// There is still left the question with the case
// let array = [22, 52, 95, 78, 66];
// should be 1 not 3
function stressTest() {
  while (true) {
    let count = Math.floor(Math.random() * 7) + 1;
    let array = [];
    for (let i = 0; i < count; i++) {
      array.push(Math.floor(Math.random() * 100) + 1);
    }

    const res1 = getNumberOfInversions([...array]);
    const res2 = getNumberOfInversionsNaive([...array]);

    console.log(count);
    if (res1.inversions !== res2.inversions) {
      console.log(array);
      console.log(`Wrong answer: ${res1.inversions} ${res2.inversions}`);
      break;
    } else {
      console.log('OK');
    }
  }
  process.exit();
}

stressTest();
