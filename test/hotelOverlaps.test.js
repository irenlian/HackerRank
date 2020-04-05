const chai = require('chai');
const { hotel, reservation } = require('../random_excercises/challenges/hotelOverlaps');

describe('Hotel', () => {
  before(() => {
    console.log('\tCheck whether there is no overlap in bookings');
  });
  describe('Checking two arrays of checkins and checkouts and return if found overlap', () => {
    const testCases = [
      {
        checkins: [1, 3, 5], checkouts: [2, 6, 8], rooms: 1, result: false,
      },
      {
        checkins: [1, 2, 3], checkouts: [2, 3, 4], rooms: 1, result: true,
      },
      {
        checkins: [13, 14, 36, 19, 44, 1, 45, 4, 48, 23, 32, 16, 37, 44, 47, 28, 8, 47, 4, 31, 25, 48, 49, 12, 7, 8],
        checkouts: [28, 27, 61, 34, 73, 18, 50, 5, 86, 28, 34, 32, 75, 45, 68, 65, 35, 91, 13, 76, 60, 90, 67, 22, 51, 53],
        rooms: 23,
        result: true,
      },
    ];
    testCases.forEach((test) => {
      it(`should return ${test.result} for ${test.rooms} rooms`, () => {
        const result = hotel(test.checkins, test.checkouts, test.rooms);
        chai.expect(result).to.equal(test.result);
      });
    });
  });
  describe('Checking array of reservations and return if there is empty room for new one', () => {
    describe('Working examples', () => {
      const testCases = [
        {
          reservations: [
            { checkin: '2020-01-01', checkout: '2020-01-02' },
            { checkin: '2020-01-03', checkout: '2020-01-06' },
          ],
          checkin: '2020-01-05',
          checkout: '2020-01-08',
          rooms: 1,
          result: false,
        },
        {
          reservations: [
            { checkin: '2020-01-01', checkout: '2020-01-02' },
            { checkin: '2020-01-02', checkout: '2020-01-03' },
          ],
          checkin: '2020-01-03',
          checkout: '2020-01-04',
          rooms: 1,
          result: true,
        },
        {
          reservations: [
            { checkin: '2020-01-01', checkout: '2020-01-02' },
            { checkin: '2020-01-03', checkout: '2020-01-06' },
            { checkin: '2020-01-13', checkout: '2020-01-28' },
            { checkin: '2020-01-01', checkout: '2020-01-30' },
            { checkin: '2020-01-30', checkout: '2020-02-30' },
          ],
          checkin: '2020-01-25',
          checkout: '2020-02-04',
          rooms: 3,
          result: true,
        },
      ];
      testCases.forEach((test) => {
        it(`should return ${test.result} for checkin ${test.checkin} and checkout ${test.checkout}`, () => {
          const result = reservation(test.reservations, test.checkin, test.checkout, test.rooms);
          chai.expect(result).to.equal(test.result);
        });
      });
    });
    describe('Edge cases', () => {
      const testCases = [
        {
          reservations: undefined,
          checkin: null,
          checkout: null,
          rooms: 3,
          result: false,
          summary: 'reservations = undefined and dates = null',
        },
        {
          reservations: null,
          checkin: 'null',
          checkout: '',
          rooms: 3,
          result: false,
          summary: 'dates are text',
        },
        {
          reservations: [null, undefined],
          checkin: '2020-01-05',
          checkout: '2020-01-08',
          rooms: 3,
          result: true,
          summary: 'elements of reservations are null and undefined',
        },
        {
          reservations: [
            { checkin: '2020-01-01', checkout: '2020-01-02' },
            { checkin: '2020-01-03', checkout: '2020-01-06' },
          ],
          checkin: '2020-01-05',
          checkout: '2020-01-08',
          rooms: 0,
          result: false,
          summary: 'rooms number is equal 0',
        },
        {
          reservations: [
            { checkin: '2020-01-01', checkout: '2020-01-02' },
            { checkin: '2020-01-03', checkout: '2020-01-06' },
          ],
          checkin: '2000-01-05',
          checkout: '2000-01-08',
          rooms: 1,
          result: false,
          summary: 'dates are in the past',
        },
        {
          reservations: [
            { checkin: '2020-01-01', checkout: '2020-01-02' },
            { checkin: '2020-01-03', checkout: '2020-01-06' },
          ],
          checkin: '2020-01-08',
          checkout: '2020-01-05',
          rooms: 1,
          result: false,
          summary: 'checkout is less than checkin',
        },
        {
          reservations: [
            { checkin: '2020-01-01', checkout: '2020-01-02' },
            { checkin: '2020-01-03', checkout: '2020-01-02' },
          ],
          checkin: '2020-01-03',
          checkout: '2020-01-04',
          rooms: 1,
          result: true,
          summary: 'checkout is less than checkin in reservation array',
        },
      ];
      testCases.forEach((test) => {
        it(`should return ${test.result} for ${test.summary}`, () => {
          const result = reservation(test.reservations, test.checkin, test.checkout, test.rooms);
          chai.expect(result).to.equal(test.result);
        });
      });
    });
  });
});
