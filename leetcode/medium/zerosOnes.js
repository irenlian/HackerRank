// https://leetcode.com/problems/ones-and-zeroes/

function findMaxForm(strs, m, n) {
  const dp = [[0]];
  for (let s of strs) {
    const zeros = [...s].reduce((sum, l) => l === '0' ? sum + 1 : sum, 0);
    const ones = s.length - zeros;
    for (let i = m; i >= zeros; i -= 1) {
      if (!dp[i]) dp[i] = [];
      for (let j = n; j >= ones; j -= 1) {
        if (!dp[i - zeros][j - ones]) dp[i - zeros][j - ones] = 0;
        if (!dp[i][j]) dp[i][j] = 0;
        dp[i][j] = Math.max(dp[i][j], dp[i - zeros][j - ones] + 1);
      }
    }
  }
  return dp[m][n];
};

// console.log(findMaxForm(["1", "111","111","111","000","000","000","0011","0011","0011111","001111"], 9, 9));
console.log(findMaxForm(["00","000"], 1, 10));
