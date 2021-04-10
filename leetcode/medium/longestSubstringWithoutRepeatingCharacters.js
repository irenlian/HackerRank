//https://leetcode.com/problems/longest-substring-without-repeating-characters/

/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = (s) => {
  if (s.length < 2) {
    return s.length;
  }

  let start = 0;
  let end = 0;
  let longestSubstring = 0;
  const characters = new Set();

  while (end < s.length) {
    if (!characters[s[end]]) {
      characters[s[end]] = 1;
      end++;
      longestSubstring = Math.max(longestSubstring, end - start);
    } else {
      characters[s[start]] = 0;
      start++;
    }
  }

  return longestSubstring;
};

module.exports = lengthOfLongestSubstring;
