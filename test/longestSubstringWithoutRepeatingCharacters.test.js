const chai = require('chai');
const lengthOfLongestSubstring = require('../leetcode/medium/longestSubstringWithoutRepeatingCharacters');

describe('Longest Substring Without Repeating Characters', () => {
  const inputs = [
    'abcabcbb',
    'bbbbb',
    'pwwkew',
    '',
  ];
  const outputs = [
    3,
    1,
    3,
    0,
  ];

  inputs.forEach((input, index) => {
    it(`should return the biggest substring ${outputs[index]}`, () => {
      chai.expect(lengthOfLongestSubstring(input)).to.equal(outputs[index]);
    });
  });
});
