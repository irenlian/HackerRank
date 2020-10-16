const gcd = require("./gcd");

function gcdNaive(a, b) {
  for (let i = b; i >= 1; i--) {
    if (a % i === 0 && b % i === 0) {
      return i;
    }
  }
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  while (true) {
    const a = Math.floor(Math.random() * 100) % 100 + 1;
    const b = Math.floor(Math.random() * 100) % 100 + 1;

    console.log(a, b);
    const res1 = gcdNaive(Math.max(a, b), Math.min(a, b));
    const res2 = gcd(Math.max(a, b), Math.min(a, b));

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
