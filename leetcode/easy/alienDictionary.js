// https://leetcode.com/problems/verifying-an-alien-dictionary

const compareStrings = (alphabet) => (first, second) => {
  let i = 0;
  const length = Math.min(first.length, second.length);
  while (i < length) {
    if (alphabet[second[i]] > alphabet[first[i]])
      return true;
    if (alphabet[second[i]] < alphabet[first[i]])
      return false;
    i += 1;
  }
  return first.length <= second.length;
}

function isAlienSorted(words, order) {
  const alphabet = [...order].reduce((acc, letter, i) => ({ ...acc, [letter]: i }), {});
  const compare = compareStrings(alphabet);
  for (let i = 0; i < words.length - 1; i += 1) {
    if (!compare(words[i], words[i + 1]))
      return false;
  }
  return true;
};

console.log(isAlienSorted(["hello","leetcode"],  "hlabcdefgijkmnopqrstuvwxyz") === true);
console.log(isAlienSorted(["word","world","row"],  "worldabcefghijkmnpqstuvxyz") === false);
console.log(isAlienSorted(["apple","app"],  "abcdefghijklmnopqrstuvwxyz") === false);
console.log(isAlienSorted(["app","app"],  "abcdefghijklmnopqrstuvwxyz") === true);
console.log(isAlienSorted(["app"],  "abcdefghijklmnopqrstuvwxyz") === true);
console.log(isAlienSorted(["a","c","a"],  "abcdefghijklmnopqrstuvwxyz") === false);
console.log(isAlienSorted(["a","a"],  "abcdefghijklmnopqrstuvwxyz") === true);
