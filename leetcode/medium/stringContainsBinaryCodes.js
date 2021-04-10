// https://leetcode.com/problems/check-if-a-string-contains-all-binary-codes-of-size-k/

/*
 * Given a binary string s and an integer k.
 * Return True if every binary code of length k is a substring of s. Otherwise, return False.
 *
 * Solution: Check only the quantity of unique combinations.
 * Time complexity: O(nk)
 * We need to iterate the string, and use O(K) to calculate the hash of each substring.
 */

function hasAllCodes(s, k) {
  const uniqueCombinations = new Set();
  for (let i = 0; i <= s.length - k; i++) {
    uniqueCombinations.add(s.substring(i, i + k));
  }
  return uniqueCombinations.size === (1 << k);
}

console.log(hasAllCodes('00110110', 2) === true);
console.log(hasAllCodes('00110', 2) === true);
console.log(hasAllCodes('0110', 2) === false);
console.log(hasAllCodes('0000000001011100', 4) === false);
