//https://leetcode.com/problems/container-with-most-water/

/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = (height) => {
  const pointers = [0, height.length - 1];
  let biggestArea = 0;
  while (pointers[0] < pointers[1]) {
    const lowestNumber = Math.min(height[pointers[0]], height[pointers[1]]);
    const currentArea = lowestNumber * (pointers[1] - pointers[0])
    if (currentArea > biggestArea) {
      biggestArea = currentArea;
    }

    if (height[pointers[0]] === Math.max(height[pointers[0]], height[pointers[1]])) {
      pointers[1] -= 1;
    } else {
      pointers[0] += 1;
    }
  }
  return biggestArea;
};

module.exports = maxArea;
