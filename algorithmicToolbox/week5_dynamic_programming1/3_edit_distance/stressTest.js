const editDistance = require("./edit_distance");

function editDistanceNaive(a, b, count = 0) {
  if (!a.length && !b.length) {
    return count;
  }
  if (a.length && b.length && a[0] === b[0]) return editDistanceNaive(a.substring(1), b.substring(1), count);
  const options = [];
  if (a.length) options.push(editDistanceNaive(a.substring(1), b, count + 1));
  if (b.length) options.push(editDistanceNaive(a, b.substring(1), count + 1));
  if (a.length && b.length) options.push(editDistanceNaive(a.substring(1), b.substring(1), count + 1));
  return Math.min(...options);
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  while (true) {
    const aLength = Math.floor(Math.random() * 10) + 1;
    let a = '';
    for (let i = 0; i < aLength; i++) {
      a += Math.floor(Math.random() * 10) % 10 + 1;
    }
    const bLength = Math.floor(Math.random() * 10) + 1;
    let b = '';
    for (let i = 0; i < bLength; i++) {
      b += Math.floor(Math.random() * 10) % 10 + 1;
    }
    const res1 = editDistanceNaive(a, b);
    const res2 = editDistance(a, b);
    console.log(a, b);
    // const res1 = editDistance('2', '88228');
    // console.log(res1, res1 === 4);
    // const res2 = editDistance('short', 'ports');
    // console.log(res2, res2 === 3);
    // const res3 = editDistance('editing', 'distance');
    // console.log(res3, res3 === 5);

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
