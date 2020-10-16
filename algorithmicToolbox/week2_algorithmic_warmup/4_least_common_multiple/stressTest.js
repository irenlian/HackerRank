const lcm = require("./lcm");

function lcmNaive(a, b) {
  let i = Math.max(a, b);
  while (true) {
    if (i % a === 0 && i % b === 0) {
      return i;
    }
    i++;
  }
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  while (true) {
    const a = Math.floor(Math.random() * 100) + 1;
    const b = Math.floor(Math.random() * 100) + 1;

    console.log(a, b);
    const res1 = lcmNaive(a, b);
    const res2 = lcm(a, b);

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
