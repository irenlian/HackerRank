// https://leetcode.com/problems/longest-valid-parentheses/

function longestValidParentheses(s) {
  let dp = [-1];

  for (let i = 1; i < s.length; i += 1) {
    if (s[i] === '(') {
      dp[i] = -1;
    } else {
      if (dp[i - 1] === -1 && s[i - 1] === '(') {
        let j = i - 1;
        while (j > 0 && dp[j - 1] !== -1) j = dp[j - 1];
        dp[i] = j;
      } else if (dp[i - 1] !== -1) {
        let j = dp[i - 1];
        while (j > 0 && dp[j - 1] !== -1) j = dp[j - 1];
        if (s[j - 1] === '(') dp[i] = j - 1;
        else dp[i] = -1;
      } else {
        dp[i] = -1;
      }
    }
  }

  let i = dp.length - 1;
  let maxCount = 0;
  let count = 0;

  while (i >= 0) {
    if (dp[i] === -1) {
      if (count) {
        maxCount = Math.max(maxCount, count);
        count = 0;
      }
      i -= 1;
    } else {
      count += i - dp[i] + 1;
      i = dp[i] - 1;
    }
  }

  return Math.max(maxCount, count);
}

console.log(longestValidParentheses("()()))(()(((()))()(()()()))(((())(())()()()))))()())((()))()()((())(())())()((())(()(()(()())()(()()(()()()()") === 40);
console.log(longestValidParentheses("(()(()))))") === 8);
console.log(longestValidParentheses("(())") === 4);
console.log(longestValidParentheses("(()") === 2);
console.log(longestValidParentheses(")()())") === 4);
console.log(longestValidParentheses("") === 0);
console.log(longestValidParentheses("))") === 0);
console.log(longestValidParentheses("((") === 0);

