//https://www.hackerrank.com/challenges/recursive-digit-sum/problem

/**
 * Given an integer, we need to find the super digit of the integer.
 *
 * If  has only  digit, then its super digit is .
 * Otherwise, the super digit of  is equal to the super digit of the sum of the digits of .
 *
 * @param n - a string representation of an integer
 * @param k - an integer, the times to concatenate n to make x
 * @returns {number}
 */

const digitSum = (n, k) => {
  const inputNumber = parseInt(n, 10);
  if (inputNumber < 10 && k === 1) return inputNumber;

  const calculatedSum = n.split('').reduce((sum, letter) => sum + parseInt(letter, 10), 0);
  return digitSum((calculatedSum * k).toString(), 1);
};

console.log(digitSum('148', 3)); // expected output: 3
console.log(digitSum('9875', 4)); // expected output: 8
