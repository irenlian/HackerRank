const minimumBribes = require('../exercises/newYearChaos');
const chai = require('chai');

describe('New Year Chaos', () => {
  it ('should return 7 bribes for queue 1 2 5 3 7 8 6 4', () => {
    const readLine = "1 2 5 3 7 8 6 4";
    const q = readLine.split(' ').map(qTemp => parseInt(qTemp, 10));
    const result = minimumBribes(q);
    chai.expect(result).to.equal(7);
  });
});