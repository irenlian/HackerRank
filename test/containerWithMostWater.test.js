const chai = require('chai');
const maxArea = require('../leetcode/medium/containerWithMostWater');

describe('Container With Most Water', () => {
  const inputs = [
    [1,8,6,2,5,4,8,3,7],
  ];
  const outputs = [
    49,
  ];

  inputs.forEach((input, index) => {
    it(`should return the biggest area ${outputs[index]}`, () => {
      chai.expect(maxArea(input)).to.equal(outputs[index]);
    });
  });
});
