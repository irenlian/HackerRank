// https://leetcode.com/problems/jump-game-ii
function jump(nums) {
  const dp = [0];
  for (let i = 0; i < nums.length - 1; i++) {
    const maxJump = nums[i];
    for (let j = 1; j <= maxJump; j++) {
      if (i + j >= nums.length) break;
      if (!dp[i + j] || dp[i + j] > dp[i] + 1) {
        dp[i + j] = dp[i] + 1;
      }
    }
  }
  return dp[nums.length - 1];
};

console.log(jump([2,3,1,1,4]) === 2);
console.log(jump([2,3,0,1,4]) === 2);
