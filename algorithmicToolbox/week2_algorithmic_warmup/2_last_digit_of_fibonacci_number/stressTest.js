const fib = require("./fibonacci_last_digit");

function fibNaive(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return (fibNaive(n - 1) + fibNaive(n - 2)) % 10;
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  while (true) {
    const nth = Math.floor(Math.random() * 100) % 15 + 1;

    console.log(nth);
    const res1 = fibNaive(nth);
    const res2 = fib(nth);

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
