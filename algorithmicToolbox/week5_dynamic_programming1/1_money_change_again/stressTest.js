const moneyChangeAgain = require("./money_change_again");

function moneyChangeNaive(n, count = 0) {
  if (n === 0) return count;
  if (n < 0) return Number.MAX_VALUE;
  return Math.min(moneyChangeNaive(n - 4, count + 1), moneyChangeNaive(n - 3, count + 1), moneyChangeNaive(n - 1, count + 1));
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  while (true) {
    const n = Math.floor(Math.random() * 30) + 1;

    const res2 = moneyChangeAgain(n);
    console.log(n);
    const res1 = moneyChangeNaive(n);

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
