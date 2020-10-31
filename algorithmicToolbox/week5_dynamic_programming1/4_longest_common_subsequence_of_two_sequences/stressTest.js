const longestCommonSubsequence = require("./longest_common_subsequence_of_two_sequences");

function longestCommonSubsequenceNaive(a, b, count = 0) {
  if (!a.length && !b.length) {
    return count;
  }
  if (a.length && b.length && a[0] === b[0]) return longestCommonSubsequenceNaive(a.slice(1), b.substring(1), count + 1);
  const options = [];
  if (a.length) options.push(longestCommonSubsequenceNaive(a.slice(1), b, count));
  if (b.length) options.push(longestCommonSubsequenceNaive(a, b.slice(1), count));
  if (a.length && b.length) options.push(longestCommonSubsequenceNaive(a.slice(1), b.slice(1), count));
  return Math.max(...options);
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  while (true) {
    const aLength = Math.floor(Math.random() * 10) + 1;
    let a = [];
    for (let i = 0; i < aLength; i++) {
      a += Math.floor(Math.random() * 10) + 1;
    }
    const bLength = Math.floor(Math.random() * 10) + 1;
    let b = [];
    for (let i = 0; i < bLength; i++) {
      b += Math.floor(Math.random() * 10) + 1;
    }
    const res1 = longestCommonSubsequenceNaive(a, b);
    const res2 = longestCommonSubsequence(a, b);
    console.log(a, b);

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
