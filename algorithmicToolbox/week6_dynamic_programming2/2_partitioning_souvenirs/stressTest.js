const partitioningSouvenirs = require("./partitioning_souvenirs");

function partitioningSouvenirsNaive(capacity, souvenirs, first = [], second = [], third = []) {
  const firstSum = first.reduce((s, value) => s + value, 0);
  const secondSum = second.reduce((s, value) => s + value, 0);
  const thirdSum = third.reduce((s, value) => s + value, 0);

  if (souvenirs.length === 0 && firstSum === secondSum && secondSum === thirdSum) {
    return 1;
  }
  if (souvenirs.length === 0) {
    return 0;
  }

  const options = [];
  if (firstSum + souvenirs[0] <= capacity) {
    options.push(partitioningSouvenirsNaive(capacity, souvenirs.slice(1), [...first, souvenirs[0]], second, third));
  }
  if (secondSum + souvenirs[0] <= capacity) {
    options.push(partitioningSouvenirsNaive(capacity, souvenirs.slice(1), first, [...second, souvenirs[0]], third));
  }
  if (thirdSum + souvenirs[0] <= capacity) {
    options.push(partitioningSouvenirsNaive(capacity, souvenirs.slice(1), first, second, [...third, souvenirs[0]]));
  }
  return Math.max(0, ...options);
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  // console.log(partitioningSouvenirs([40]) === 0);
  // console.log(partitioningSouvenirs([3, 3, 3, 3]) === 0);
  // console.log(partitioningSouvenirs([17, 59, 34, 57, 17, 23, 67, 1, 18, 2, 59]) === 1);
  // console.log(partitioningSouvenirs([1, 2, 3, 4, 5, 5, 7, 7, 8, 10, 12, 19, 25]) === 1);
  // console.log(partitioningSouvenirs([ 1, 6, 2, 7, 8, 3 ]) === 1);
  while (true) {
    const souvenirsNumber = Math.floor(Math.random() * 10) + 1;
    let souvenirs = [
      1, 3,  5,  5,  6,
      9, 9, 10, 10, 11
    ];
    // for (let i = 0; i < souvenirsNumber; i++) {
    //   souvenirs.push(Math.floor(Math.random() * 13) + 1);
    // }
    const capacity = souvenirs.reduce((s, value) => s + value, 0);
    const res1 = partitioningSouvenirsNaive(capacity / 3, souvenirs);
    const res2 = partitioningSouvenirs(souvenirs);

    console.log(capacity, souvenirsNumber);
    if (res1 !== res2) {
      console.log(`Wrong answer: ${res1} ${res2}`);
      console.log(souvenirs);
      break;
    } else {
      console.log('OK');
    }
  }
  process.exit();
}

stressTest();
