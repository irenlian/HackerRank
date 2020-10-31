const longestCommonSubsequence = require("./longest_common_subsequence_of_three_sequences");

function longestCommonSubsequenceNaive(a, b, c, count = 0) {
  if (!a.length || !b.length || !c.length) {
    return count;
  }
  if (a.length && b.length && c.length && a[0] === b[0] && c[0] === b[0]) {
    return longestCommonSubsequenceNaive(a.slice(1), b.slice(1), c.slice(1), count + 1);
  }
  const options = [];
  options.push(longestCommonSubsequenceNaive(a.slice(1), b, c, count));
  options.push(longestCommonSubsequenceNaive(a, b.slice(1), c, count));
  options.push(longestCommonSubsequenceNaive(a, b, c.slice(1), count));
  options.push(longestCommonSubsequenceNaive(a.slice(1), b.slice(1), c, count));
  options.push(longestCommonSubsequenceNaive(a.slice(1), b, c.slice(1), count));
  options.push(longestCommonSubsequenceNaive(a, b.slice(1), c.slice(1), count));
  options.push(longestCommonSubsequenceNaive(a.slice(1), b.slice(1), c.slice(1), count));
  return Math.max(...options);
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  while (true) {
    const aLength = Math.floor(Math.random() * 8) + 1;
    let a = [];
    for (let i = 0; i < aLength; i++) {
      a += Math.floor(Math.random() * 10) + 1;
    }
    const bLength = Math.floor(Math.random() * 8) + 1;
    let b = [];
    for (let i = 0; i < bLength; i++) {
      b += Math.floor(Math.random() * 10) + 1;
    }
    const cLength = Math.floor(Math.random() * 8) + 1;
    let c = [];
    for (let i = 0; i < cLength; i++) {
      c += Math.floor(Math.random() * 10) + 1;
    }
    console.time('Naive algorithm');
    const res1 = longestCommonSubsequenceNaive(a, b, c);
    console.timeEnd('Naive algorithm');
    console.time('Optimized algorithm');
    const res2 = longestCommonSubsequence(a, b, c);
    console.timeEnd('Optimized algorithm');

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
