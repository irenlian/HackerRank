/*
 * https://leetcode.com/problems/subsets/
 * Task:
 * Given an integer array nums of unique elements, return all possible subsets (the power set).
 * The solution set must not contain duplicate subsets. Return the solution in any order.
 *
 * Solution:
 * - Known fact that the number of sequences equals elements length raised to the power of 2
 * - Iterating the index of sequences representing the bit mask for the elements sequence
 * - If the bit is set for the element index, so add this element to the subset
 *
 * Time complexity: O(n * 2^n)
 */

function subsets(nums) {
  const res = [];
  for (let i = 0; i < (1 << nums.length); i++) {
    res[i] = [];
    for (let j = 0; j < nums.length; j++) {
      if ((i >> j) & 1) res[i].push(nums[j]);
    }
  }
  return res;
}
