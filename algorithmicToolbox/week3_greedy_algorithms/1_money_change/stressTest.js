const moneyChange = require("./money_change");

function moneyChangeNaive(n) {
  const options = [10, 5, 1];
  let coins = 0, sum = 0;
  while (sum < n) {
    for (let i = 0; i < options.length; i++) {
      if (sum + options[i] <= n) {
        sum += options[i];
        coins++;
        break;
      }
    }
  }
  return coins;
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  while (true) {
    const n = Math.floor(Math.random() * 10000) + 1;

    const res1 = moneyChangeNaive(n);
    const res2 = moneyChange(n);

    console.log(n);
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
