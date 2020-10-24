const carFueling = require("./car_fueling");

function getToNextStation(distance, carCapacity, gasStations, currentPosition, refills) {
  if (currentPosition >= distance - carCapacity) return refills;
  if (gasStations.length === 0 && distance - currentPosition > carCapacity) return -1;
  if (gasStations.length === 0 && distance - currentPosition <= carCapacity) return refills;

  let minRefills = -1;
  for (let i = 0; i < gasStations.length; i++) {
    if (gasStations[i] - currentPosition > carCapacity) break;
    if (gasStations[i] === currentPosition) continue;
    const result = getToNextStation(distance, carCapacity, gasStations.slice(i), gasStations[i], refills + 1);
    if (result !== -1 && (result < minRefills || minRefills === -1)) {
      minRefills = result;
    }
  }
  return minRefills;
}

function carFuelingNaive(distance, carCapacity, gasStations) {
  return getToNextStation(distance, carCapacity, gasStations, 0, 0);
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  while (true) {
    let distance = Math.floor(Math.random() * 100);
    let carCapacity = Math.floor(Math.random() * 20);
    let count = Math.floor(Math.random() * 10) + 1;
    let gasStations = [];
    for (let i = 0; i < count; i++) {
      gasStations.push(Math.floor(Math.random() * distance) + 1);
    }
    gasStations.sort((a,b) => a - b);

    const res1 = carFuelingNaive(distance, carCapacity, gasStations);
    const res2 = carFueling(distance, carCapacity, gasStations);

    console.log(distance, carCapacity);
    if (res1 !== res2) {
      console.log(gasStations);
      console.log(`Wrong answer: ${res1} ${res2}`);
      break;
    } else {
      console.log('OK');
    }
  }
  process.exit();
}

stressTest();
