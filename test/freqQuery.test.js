const chai = require('chai');
const freqQuery = require('../hackerrank/freqQuery');

describe('Frequency Queries (Medium)', () => {
  before(() => {
    console.log('\tIt must return an array of integers where each element is a 1 if there is at least one element value with the queried number of occurrences in the current array, or 0 if there is not.');
  });
  const testCases = [
    {
      case: [
        [1, 5],
      ],
      result: [],
    },
    {
      case: [
        [1, 5],
        [1, 6],
        [3, 2],
        [1, 10],
        [1, 10],
        [1, 6],
        [2, 5],
        [3, 2],
      ],
      result: [0, 1],
    },
    {
      case: [
        [3, 4],
        [2, 1003],
        [1, 16],
        [3, 1],
      ],
      result: [0, 1],
    },
    {
      case: [
        [1, 3],
        [2, 3],
        [3, 2],
        [1, 4],
        [1, 5],
        [1, 5],
        [1, 4],
        [3, 2],
        [2, 4],
        [3, 2],
      ],
      result: [0, 1, 1],
    },
  ];
  testCases.forEach((test) => {
    it(`should return ${test.result} for array of ${test.case.length} operations`, () => {
      const result = freqQuery(test.case);
      chai.expect(result).to.deep.equal(test.result);
    });
  });
});
