const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

process.stdin.setEncoding('utf8');

let distance = 0;
let carCapacity = 0;
let count = 0;
let gasStations = [];

rl.once('line', line => {
  distance = parseInt(line, 10);

  rl.once('line', line => {
    carCapacity = parseInt(line, 10);

    rl.once('line', line => {
      count = parseInt(line, 10);

      rl.once('line', line => {
        gasStations = line.toString().split(' ');
        for (let i = 0; i < gasStations.length; i++) {
          gasStations[i] = parseInt(gasStations[i], 10);
        }

        console.log(carFueling(distance, carCapacity, gasStations));
      });
    });
  });
});

function carFueling(distance, carCapacity, gasStations) {
  let currentDistance = 0, currentStation = -1, refills = 0, i = 0;

  while (currentDistance < distance && currentStation < gasStations.length && i < gasStations.length) {
    if (gasStations[i] - currentDistance > carCapacity && (i - currentStation === 1 || gasStations[i - 1] === currentDistance)) {
      return -1; // impossible
    } else if (gasStations[i] - currentDistance > carCapacity) {
      currentStation = i - 1;
      currentDistance = gasStations[currentStation];
      refills++;
    } else {
      i++;
    }
  }

  if (currentDistance + carCapacity < distance && currentStation !== gasStations.length - 1) {
    currentStation = gasStations.length - 1;
    currentDistance = gasStations[currentStation];
    refills++;
  }

  if (currentDistance + carCapacity < distance) {
    return -1; // impossible
  }
  return refills;
}

module.exports = carFueling;
