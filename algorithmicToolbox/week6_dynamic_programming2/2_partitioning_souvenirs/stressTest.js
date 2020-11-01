const partitioningSouvenirs = require("./partitioning_souvenirs");

function partitioningSouvenirsNaive(souvenirs) {
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  console.log(partitioningSouvenirs([40]) === 0);
  console.log(partitioningSouvenirs([3, 3, 3, 3]) === 0);
  console.log(partitioningSouvenirs([17, 59, 34, 57, 17, 23, 67, 1, 18, 2, 59]) === 1);
  console.log(partitioningSouvenirs([1, 2, 3, 4, 5, 5, 7, 7, 8, 10, 12, 19, 25]) === 1);
  // while (true) {
  //   const capacity = Math.floor(Math.random() * 30) + 1;
  //   const barsNumber = Math.floor(Math.random() * 8) + 1;
  //   let bars = [];
  //   for (let i = 0; i < barsNumber; i++) {
  //     bars.push(Math.floor(Math.random() * 10) + 1);
  //   }
  //   const res1 = maximumAmountOfGoldNaive(capacity, bars);
  //   const res2 = maximumAmountOfGold(capacity, bars);
  //
  //   console.log(capacity, barsNumber);
  //   if (res1 !== res2) {
  //     console.log(`Wrong answer: ${res1} ${res2}`);
  //     console.log(bars);
  //     break;
  //   } else {
  //     console.log('OK');
  //   }
  // }
  process.exit();
}

stressTest();
