const organizingLottery = require("./organizing_a_lottery");

function organizingLotteryNaive(ranges, bets) {
  const result = [];

  for (let i = 0; i < bets.length; i++) {
    let count = 0;
    for (let j = 0; j < ranges.length; j++) {
      if (bets[i] >= ranges[j][0] && bets[i] <= ranges[j][1]) {
        count++;
      }
    }
    result.push(count);
  }

  return result;
}

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
    const rangesCount = Math.floor(Math.random() * 100) + 1;
    const betsCount = Math.floor(Math.random() * 10) + 1;
    const ranges = [];
    for (let i = 0; i < rangesCount; i++) {
      const low = Math.floor(Math.random() * 100) * (Math.random() < 0.5 ? -1 : 1);
      const height = Math.floor(Math.random() * 100) * (Math.random() < 0.5 ? -1 : 1);
      ranges.push([Math.min(low, height), Math.max(low, height)]);
    }
    const bets = [];
    for (let i = 0; i < betsCount; i++) {
      bets.push(Math.floor(Math.random() * 100) * (Math.random() < 0.5 ? -1 : 1));
    }

    const res1 = organizingLotteryNaive(ranges, bets);
    const res2 = organizingLottery(ranges, bets);

    console.log(rangesCount, betsCount);
    if (!isEqual(res1, res2)) {
      console.log(ranges);
      console.log(bets);
      console.log(`Wrong answer: ${res1} ${res2}`);
      break;
    } else {
      console.log('OK');
    }
  }
  process.exit();
}

stressTest();
