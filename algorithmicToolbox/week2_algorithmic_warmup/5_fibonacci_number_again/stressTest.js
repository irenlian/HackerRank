const getFibMod = require("./fibonacci_huge");

function fibNaive(n) {
  let n1 = 1, n2 = 0;
  let index = 1;

  if (n === 0) return n2;
  if (n === 1) return n1;

  while (index++ < n) {
    const fibNumber = n1 + n2;
    n2 = n1;
    n1 = fibNumber;
  }
  return n1;
}

function fibNaiveMod(n, m) {
  return (fibNaive(n - 1) + fibNaive(n - 2)) % m;
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  while (true) {
    const nth = Math.floor(Math.random() * 75) + 1;
    const m = Math.floor(Math.random() * 100) + 2;

    const res1 = fibNaiveMod(nth, m);
    const res2 = getFibMod(nth, m);

    console.log(nth, m);
    if (res1 !== res2) {
      console.log(`Wrong answer: ${res1} ${res2}`);
      break;
    } else {
      console.log('OK');
    }
  }
  // const res1 = fibNaiveMod(1000, 100);
  // const res2 = getFibMod(1000, 100);
  // console.log(res2);
  process.exit();
}

stressTest();
