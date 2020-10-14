const max = require("./max_pairwise_product");

function maxPairwiseProductNaive(arr) {
  let maxProduct = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] * arr[j] > maxProduct && i !== j) {
        maxProduct = arr[i] * arr[j];
      }
    }
  }

  return maxProduct;
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  while (true) {
    const length = Math.round(Math.random() * 1000 + 2);
    const arr = Array.from({length}, () => Math.floor(Math.random() * 100000));

    const res1 = maxPairwiseProductNaive(arr);
    const res2 = max(arr);

    console.log(arr);
    if (res1 !== res2) {
      console.log(`Wrong answer: ${res1} ${res2}`);
      break;
    } else {
      console.log('OK');
    }
  }
  process.exit();
}

stressTest();
