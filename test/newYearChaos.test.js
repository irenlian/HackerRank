const chai = require('chai');
const minimumBribes = require('../exercises/newYearChaos');

describe('New Year Chaos (Medium)', () => {
  before(() => {
    console.log('\tCount number of bribes in queue (swaps of sequential people) that leaded to current state of queue');
  });
  const testCases = [
    { case: '2 1 5 3 4', result: 3 },
    { case: '2 5 1 3 4', result: 'Too chaotic' },
    { case: '1 2 5 3 7 8 6 4', result: 7 },
  ];
  testCases.forEach((test) => {
    it(`should return ${test.result} bribes for queue ${test.case}`, () => {
      const q = test.case.split(' ').map((qTemp) => parseInt(qTemp, 10));
      const result = minimumBribes(q);
      chai.expect(result).to.equal(test.result);
    });
  });
});
