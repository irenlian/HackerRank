// https://leetcode.com/problems/binary-trees-with-factors/

const MOD = Math.pow(10, 9) + 7;

function numFactoredBinaryTrees(arr) {
  const dp = Array.from(new Array(arr.length)).fill(1);
  arr.sort((a, b) => a - b);
  const index = {};
  for (let i = 0; i < arr.length; ++i) {
    index[arr[i]] = i;
  }
  for (let i = 0; i < arr.length; ++i) {
    for (let j = 0; j < i; ++j) {
      const localRoot = arr[i];
      const left = arr[j];
      const right = localRoot / left;
      if (right % 1 === 0 && index.hasOwnProperty(right)) {
        dp[i] = (dp[i] + dp[j] * dp[index[right]]) % MOD;
      }
    }
  }
  return dp.reduce((sum, v) => ((sum + v) % MOD), 0);
}
