const majorityElement = require("./majority_element");

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  const items = [2, 3, 9, 2, 2];
  const res2 = majorityElement(items);
  console.log(res2);
  process.exit();
}

stressTest();
