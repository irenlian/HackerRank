const maximumAmountOfGold = require("./maximum_amount_of_gold");

function maximumAmountOfGoldNaive(capacity, bars) {
  if (bars.length === 1) {
    if (bars[0] <= capacity) return bars[0];
    else return 0;
  }
  const options = [];
  bars.forEach((bar, i) => {
    if (bar <= capacity) {
      options.push(bar + maximumAmountOfGoldNaive(capacity - bar, [...bars.slice(0, i), ...bars.slice(i + 1)]));
    }
  })
  return Math.max(0, ...options);
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  while (true) {
    const capacity = Math.floor(Math.random() * 30) + 1;
    const barsNumber = Math.floor(Math.random() * 8) + 1;
    let bars = [];
    for (let i = 0; i < barsNumber; i++) {
      bars.push(Math.floor(Math.random() * 10) + 1);
    }
    const res1 = maximumAmountOfGoldNaive(capacity, bars);
    const res2 = maximumAmountOfGold(capacity, bars);

    console.log(capacity, barsNumber);
    if (res1 !== res2) {
      console.log(`Wrong answer: ${res1} ${res2}`);
      console.log(bars);
      break;
    } else {
      console.log('OK');
    }
  }
  process.exit();
}

stressTest();
