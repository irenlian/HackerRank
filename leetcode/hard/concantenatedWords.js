/** Description:
 * https://leetcode.com/problems/concatenated-words/
 * Given an array of strings words (without duplicates), return all the concatenated words in the given list of words.
 * A concatenated word is defined as a string that is comprised entirely of at least two shorter words in the given array.
 */

/**
 * @param {string[]} words
 * @return {string[]}
 */

// Solution with trie usage
// Time complexity: O(n*m) where n - a number of words and m - length of each word
// Space complexity: O(n*m) + recursive stack of O(k) where k is the number of concantenated words

function findAllConcatenatedWordsInADict(words) {
  // Create a trie to store the words and mark the word ending
  const trie = {};
  for (const word of words) {
    let root = trie;
    for (const letter of word) {
      if (!root[letter]) {
        root[letter] = {};
      }
      root = root[letter];
    }
    // eliminate storing the empty words, but mark ending
    if (word.length) root['end'] = {};
  }
  // mark the word as contanated if it consists of more words than itself
  const concantenated = [];
  for (const word of words) {
    const r = countConcantenated(word, trie);
    if (r > 1) {
      concantenated.push(word);
    }
  }
  return concantenated;
};

function countConcantenated(word, trie) {
  let root = trie;
  for (let i = 0; i < word.length; i++) {
    if (!root[word[i]]) {
      return 0;
    }
    // if there is such a word (whole one)
    if (root[word[i]]['end']) {
      // recursively check the word ending
      const res = countConcantenated(word.substring(i + 1), trie);
      if (res) {
        return res + 1;
      }
    }
    root = root[word[i]];
  }
  // count if the whole word is in trie
  if (root['end']) {
    return 1;
  }
  return 0;
}

const testCases = {
  inputs: [
    ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"],
    ["cat","dog","catdog"],
    ["cat","dog"],
    ["cat","dog","vcatdogk","catdo","ccat"],
    [""],
    ["cat",""],
    ["a","b","ab","abc"]
  ],
  outputs: [
    ["catsdogcats","dogcatsdog","ratcatdogcat"],
    ["catdog"],
    [],
    [],
    [],
    [],
    ["ab"]
  ]
};

testCases.inputs.forEach((input, i) => {
  console.log(`For ${input} the result is ${uniqueLetterString(input) === testCases.outputs[i] ? 'correct' : 'wrong'}`)
})
