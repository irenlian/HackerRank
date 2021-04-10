// https://leetcode.com/problems/word-subsets/

function createMap(B) {
  const map = {};
  for (let query of B) {
    const queryMap = {};
    for (let letter of query) {
      queryMap[letter] = queryMap[letter] ? queryMap[letter] + 1 : 1;
      if (!map[letter] || queryMap[letter] > map[letter]) {
        map[letter] = queryMap[letter];
      }
    }
  }
  return map;
}

function wordSubsets(A, B) {
  const map = createMap(B);
  const universal = [];
  for (let word of A) {
    let isUniversal = true;
    for (let letter in map) {
      const count = [...word].reduce((sum, l) => l === letter ? sum + 1 : sum, 0);
      if (count < map[letter]) {
        isUniversal = false;
        break;
      }
    }
    if (isUniversal) {
      universal.push(word);
    }
  }
  return universal;
};

console.log(wordSubsets(["amazon","apple","facebook","google","leetcode"], ["e","o"]));
