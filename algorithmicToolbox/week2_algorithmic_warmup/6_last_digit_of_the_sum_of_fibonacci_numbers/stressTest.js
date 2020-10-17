const getFibLastDigitOfSum = require("./fibonacci_last_digit_sum");

function fibLastDigitSumNaive(n) {
  let n1 = 1, n2 = 0, sum = 1;
  let index = 1;

  if (n === 0) return n2;
  if (n === 1) return n1;

  while (index++ < n) {
    const fibNumber = n1 + n2;
    n2 = n1;
    n1 = fibNumber;
    sum += fibNumber;
  }
  return sum % 10;
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  while (true) {
    const nth = Math.floor(Math.random() * 75) + 1;

    const res1 = fibLastDigitSumNaive(nth);
    const res2 = getFibLastDigitOfSum(nth);

    console.log(nth);
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
