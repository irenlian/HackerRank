function columnNumber(num) {
  let column = '';
  while (num > 0) {
    if (num > 26) {
      column += String.fromCharCode(num % 26 + 64);
    } else {
      column += String.fromCharCode(num + 64);
    }
    num = Math.floor(num / 26);
  }
  return column;
}

console.log(columnNumber(1));
console.log(columnNumber(55));
console.log(columnNumber(703));

function titleToNumber(A) {
  let column = 0;
  for (let i = A.length - 1; i >= 0; i--) {
    if (i != A.length - 1) column += (A.charCodeAt(i) - 64) * Math.pow(26, (A.length - i - 1));
    else column += (A.charCodeAt(i) - 64);
  }
  return column;
}
console.log(titleToNumber('A'));
console.log(titleToNumber('Z'));
console.log(titleToNumber('AA'));
console.log(titleToNumber('AZ'));
console.log(titleToNumber('BA'));
console.log(titleToNumber('BZ'));
console.log(titleToNumber('AAA'));
console.log(titleToNumber('ABA'));
