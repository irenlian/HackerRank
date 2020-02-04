// https://www.hackerrank.com/challenges/alternating-characters/problem

function alternatingCharacters(s) {
  let deletions = 0;
  let current = s[0];
  let nextLetter = 0;
  for (let i = 0; i < s.length; i++) {
    nextLetter = s.indexOf(current === 'A' ? 'B' : 'A', i + 1);
    if (nextLetter !== -1) {
      deletions += nextLetter - i - 1;
      current = current === 'A' ? 'B' : 'A';
      i = nextLetter - 1;
    } else {
      deletions += s.length - 1 - i;
      break;
    }
  }
  return deletions;
}

// console.log(alternatingCharacters("AAABBB"));
console.log(alternatingCharacters('BABABA'));
