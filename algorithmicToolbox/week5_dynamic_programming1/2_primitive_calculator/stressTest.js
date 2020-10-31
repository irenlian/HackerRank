const primitiveCalculator = require("./primitive_calculator");

function primitiveCalculatorNaive(n, count = 0) {
  if (n === 1) {
    return count;
  }
  const options = [];
  if (n % 3 === 0) options.push(primitiveCalculatorNaive(n / 3, count + 1));
  if (n % 2 === 0) options.push(primitiveCalculatorNaive(n / 2, count + 1));
  options.push(primitiveCalculatorNaive(n - 1, count + 1));
  return Math.min(...options);
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  while (true) {
    // const n = 93;
    // const n = 92;
    // const n = 3;
    const n = Math.floor(Math.random() * 100) + 1;

    console.log(n);
    const res1 = primitiveCalculatorNaive(n);
    const res2 = primitiveCalculator(n);

    if (res1 !== res2.length - 1) {
      console.log(`Wrong answer: ${res1} ${res2.length - 1}`);
      console.log(res2);
      break;
    } else {
      console.log('OK');
    }
  }
  process.exit();
}

stressTest();
