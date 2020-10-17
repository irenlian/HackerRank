const getFibLastDigitOfPartialSum = require("./fibonacci_last_digit_partial_sum");

function fibLastDigitSumNaive(k, n) {
  let n1 = 1, n2 = 0, sum = 0;
  let index = 1;

  if (n === 0) return n2;
  if (n === 1) return n1;
  if (k <= 1) sum = 1;

  while (index++ < n) {
    const fibNumber = n1 + n2;
    n2 = n1;
    n1 = fibNumber;
    if (index >= k) {
      sum += fibNumber;
    }
  }
  return sum % 10;
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  while (true) {
    const kth = Math.floor(Math.random() * 75) + 1;
    const nth = Math.floor(Math.random() * 75) + 1;

    const res1 = fibLastDigitSumNaive(Math.min(kth, nth), Math.max(kth, nth));
    const res2 = getFibLastDigitOfPartialSum(Math.min(kth, nth), Math.max(kth, nth));

    console.log(Math.min(kth, nth), Math.max(kth, nth));
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
