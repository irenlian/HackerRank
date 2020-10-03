const chai = require('chai');
const { integerBreakON, integerBreakO1 } = require('./integerBreak');

describe('Integer Break', () => {
  const inputs = [
    2,
    10,
    3,
    4,
    5,
    8,
    9,
  ];
  const outputs = [
    1,
    36,
    2,
    4,
    6,
    18,
    27,
  ];

  describe('O(N) complexity', () => {
    inputs.forEach((input, index) => {
      it(`should return the biggest product of ${input} parts`, () => {
        chai.expect(integerBreakON(input)).to.equal(outputs[index]);
      });
    });
  });

  describe('O(1) complexity', () => {
    inputs.forEach((input, index) => {
      it(`should return the biggest product of ${input} parts`, () => {
        chai.expect(integerBreakO1(input)).to.equal(outputs[index]);
      });
    });
  });
});
