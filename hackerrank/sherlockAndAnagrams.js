// https://www.hackerrank.com/challenges/sherlock-and-anagrams/problem
function sherlockAndAnagrams(s) {
  let counter = 0; let
    length = 1;
  let first = 0; let
    second = 1;
  for (let i = 0; i < s.length; i++) {
    length = 1;
    for (let j = i + 1; j < s.length; j++) {
      first = s.substring(i, i + length);
      second = s.substring(j, j + length).split('').reverse().join('');
      if (first == second) { counter++; }
    }
  }
  return counter;
}

console.log(sherlockAndAnagrams('abcbacba'));
