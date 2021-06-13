// https://leetcode.com/problems/minimum-number-of-refueling-stops
const { MaxPriorityQueue } = require('@datastructures-js/priority-queue');

const MILES = 0;
const FUEL = 1;

function minRefuelStops(target, startFuel, stations) {
  let fuel = startFuel;
  let mile = 0;
  let i = 0;
  let refuels = 0;
  // keep the passed stations where we haven't refilled in sorted order by fuel amount
  const nextStations = new MaxPriorityQueue();
  while (i < stations.length) {
    // check if the fuel is already enough to the target
    if (target - mile <= fuel) return refuels;

    // check all stations where we can safely get to
    while (stations[i] && stations[i][MILES] - mile <= fuel) {
      nextStations.enqueue({ stationMile: stations[i][MILES], stationFuel: stations[i][FUEL] }, stations[i][FUEL]);
      i++;
    }

    // if there are any stations which we haven't used, so return impossible case
    if (nextStations.isEmpty()) return -1;

    // while we can't get even to next point (station or target) refill from the best station from past
    while (fuel < (stations[i] ? stations[i][MILES] : target) - mile && !nextStations.isEmpty()) {
      const best = nextStations.dequeue();
      const { stationMile, stationFuel } = best.element;
      if (!best) return -1;
      refuels++;
      // track current tank status
      fuel = fuel - Math.max(stationMile - mile, 0) + stationFuel;
      // track where the got to
      mile = Math.max(stationMile, mile);
    }
  }
  return (target - mile <= fuel) ? refuels : -1;
};

console.log(minRefuelStops(1, 1, [[1,1]]) === 0);
console.log(minRefuelStops(100, 1, [[10,100]]) === -1);
console.log(minRefuelStops(100, 1, [[0,100],[1,100]]) === 1);
console.log(minRefuelStops(100, 10, [[10,60],[20,30],[30,30],[60,40]]) === 2);
console.log(minRefuelStops(1000, 299, [[13,21],[26,115],[100,47],[225,99],[299,141],[444,198],[608,190],[636,157],[647,255],[841,123]]) === 4);
console.log(minRefuelStops(1000,
299,
  [[14,123],[145,203],[344,26],[357,68],[390,35],[478,135],[685,108],[823,186],[934,217],[959,80]]) === 5);
console.log(minRefuelStops(1000,
75,
  [[14,53],[39,63],[114,62],[150,34],[167,38],[192,35],[207,13],[225,6],[256,62],[288,34],[362,13],[509,4],[529,2],[546,33],[552,43],[564,69],[584,57],[754,31],[768,44],[784,2],[860,13],[874,33],[877,45],[938,51],[957,69]]) === -1);

