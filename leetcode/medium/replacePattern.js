// https://leetcode.com/problems/find-and-replace-pattern

function findAndReplacePattern(words, pattern) {
  const result = [];
  for (const word of words) {
    const map = {};
    let matches = true;
    for (let i = 0; i < pattern.length; i++) {
      if (map[pattern[i]] && map[pattern[i]] !== word[i]) {
        matches = false;
        break;
      } else if (!map[pattern[i]]) {
        map[pattern[i]] = word[i];
      }
    }
    if (matches) result.push(word);
  }
  return result;
};

console.log(findAndReplacePattern(["ccc"], "abb"));

