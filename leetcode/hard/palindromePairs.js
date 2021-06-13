// https://leetcode.com/problems/palindrome-pairs

function isPalindrome(word) {
  let i = 0;
  let j = word.length - 1;
  while (j >= i) {
    if (word[i++] !== word[j--]) return false;
  }
  return true;
}

function findPalindromeInTrie(node, prefix) {
  let palindromeIndices = [];
  for (const key in node) {
    if (key === 'value' && typeof node.value === 'number' && isPalindrome(prefix)) {
      palindromeIndices.push(node.value);
    } else {
      palindromeIndices = [...palindromeIndices, ...findPalindromeInTrie(node[key], `${prefix}${key}`)];
    }
  }
  return palindromeIndices;
}

function palindromePairs(words) {
  // Construct a trie of reversed words
  const trie = {};
  for (let i = 0; i < words.length; i++) {
    let node = trie;
    for (let j = words[i].length - 1; j >= 0; j--) {
      const letter = words[i][j];
      if (!node[letter]) node[letter] = {};
      node = node[letter];
    }
    node.value = i;
  }

  // Iterate words
  const result = [];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let node = trie;
    let hasLonger = true;
    for (let j = 0; j < word.length; j++) {
      // Search for reversed words which are shorter than the word
      if (typeof node.value === 'number' && isPalindrome(word.slice(j))) {
        result.push([i, node.value]);
      }
      if (!node[word[j]]) {
        hasLonger = false;
        break;
      }
      node = node[word[j]];
    }
    // Search for reversed words which are longer than the word
    if (hasLonger) {
      findPalindromeInTrie(node, '')
        .forEach(secondWordIndex => secondWordIndex !== i && result.push([i, secondWordIndex]));
    }
  }

  return result;
};

console.log(palindromePairs(["abcd","dcba","lls","s","sssll"])); //[[0,1],[1,0],[3,2],[2,4]]
console.log(palindromePairs(["bat","tab","cat"])); //[[0,1],[1,0]]
console.log(palindromePairs(["aaa","","tyu"])); //[[0,1],[1,0]]
console.log(palindromePairs(["bat","b","ab","sstab"])); //[[0,2],[2,1],[0,3]]
console.log(palindromePairs(["b","sstab","ab","bat"])); //[[3,1],[0,2],[3,2]]
console.log(palindromePairs(["aaa","aaaaa"])); //[[0,1],[1,0]]
console.log(palindromePairs(["ba","ab","abb"])); //[[0,1],[1,0],[2,0]]
console.log(palindromePairs(["df","dfffd","dddff"])); //[]
