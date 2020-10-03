//https://leetcode.com/problems/integer-break/

/**
 * Given a positive integer n, break it into the sum of at least two positive integers and maximize the product of those integers.
 * Return the maximum product you can get.
 */

/**
 * @param {number} n
 * @return {number}
 */

// First solution O(N) complexity
exports.integerBreakON = (n) => {
  if (n === 2) return 1;
  if (n === 3) return 2;

  // divide the number to N parts and return a product of them
  const productOfPartsNum = (number, parts, isFloor) => {
    const part = isFloor ? Math.floor(number/parts) : Math.ceil(number/parts);
    return Math.pow(part, (parts - 1)) * (number - ((parts - 1) * part));
  };

  // Number of possible factors are between 2 and n / 2, try two different ways for each parts number
  let maxProduct = 0;
  for (let i = 2; i <= n / 2; i++) {
    maxProduct = Math.max(maxProduct, productOfPartsNum(n, i, false));
    maxProduct = Math.max(maxProduct, productOfPartsNum(n, i, true));
  }

  return maxProduct;
};

// Second solution O(1) complexity based on assumption that the best factor is 3
exports.integerBreakO1 = (n) => {
  if (n === 2) return 1;
  if (n === 3) return 2;

  // Count factors of number 3
  let n3_number = Math.floor(n/3);

  // Calculate remainder
  let remainder = n % 3;
  if (remainder === 1) {
    remainder = 4;
    n3_number--;
  } else if (remainder === 0) {
    remainder = 1;
  }

  return Math.pow(3, n3_number) * remainder;
}
