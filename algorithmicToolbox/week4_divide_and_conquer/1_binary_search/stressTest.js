const binarySearch = require("./binary_search");

function binarySearchNaive(array, key) {
  return array.indexOf(key);
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  while (true) {
    let key = Math.floor(Math.random() * 1000000000) + 1;
    let count = Math.floor(Math.random() * 30000) + 1;
    let array = [];
    for (let i = 0; i < count; i++) {
      array.push(Math.floor(Math.random() * 1000000000) + 1);
    }
    array.sort((a,b) => a - b);
    array = [...new Set(array)];

    const res1 = binarySearchNaive(array, key);
    const res2 = binarySearch(array, key);

    console.log(count, key);
    if (res1 !== res2) {
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
