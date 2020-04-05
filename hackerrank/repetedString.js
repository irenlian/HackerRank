// https://www.hackerrank.com/challenges/repeated-string/problem
function repeatedString(s, n) {
  let counter = s.split('a').length - 1;
  // let counter = (Array.from(s)).reduce((counter, letter) => {
  // 	return (letter == 'a') ? ++counter : counter;
  // }, 0);
  counter *= Math.floor(n / s.length);
  n %= s.length;
  for (let i = 0; i < n; i++) {
    if (s[i] == 'a') { counter++; }
  }
  return counter;
}

console.log(repeatedString('abcac', 10));
