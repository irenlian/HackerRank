const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
  rl.once('line', (line) => {
    const souvenirs = line.toString().split(' ').map(Number);

    console.log(partitioningSouvenirs(souvenirs));
    process.exit();
  });
});

function getMatrixOfElements(capacity, elems) {
  const results = [new Array(capacity + 1).fill(0)];

  for (let i = 1; i <= elems.length; i++) {
    const elemIndex = i - 1;
    results[i] = [0];
    for (let j = 1; j <= capacity; j++) {
      results[i][j] = results[i - 1][j];
      let previous = results[i - 1][j - elems[elemIndex]];
      if (previous !== undefined
        && previous + elems[elemIndex] <= capacity
        && previous + elems[elemIndex] > results[i - 1][j]) {
        results[i][j] = previous + elems[elemIndex];
      }
    }
  }

  return results;
}

function getSouvenirs(capacity, souvenirs) {
  const matrix = getMatrixOfElements(capacity, souvenirs);

  const chosen = [];
  let i = souvenirs.length, j = capacity;
  while (i > 0 && j > 0) {
    const souvenir = souvenirs[i - 1];
    if (matrix[i - 1][j] <= matrix[i - 1][j - souvenir] + souvenir) {
      j -= souvenir;
      chosen.push(souvenir);
    }
    i--;
  }
  return chosen;
}

function getArrayDifference(array1, array2) {
  const initial = [...array1];
  const excludes = [...array2];

  for (let i = 0; i < initial.length; i++) {
    for (let j = 0; j < excludes.length; j++) {
      if (initial[i] === excludes[j]) {
        initial.splice(i, 1);
        excludes.splice(j, 1);
        i--;
        j--;
      }
    }
  }
  return initial;
}

function partitioningSouvenirs(souvenirs) {
  // check whether souvenirs can be divided at whole
  const sum = souvenirs.reduce((s, value) => s + value, 0);
  if (sum % 3 !== 0) return 0;

  // sort souvenirs to get bigger elements first
  const sortedSouvenirs = souvenirs.sort((a, b) => a - b);

  // get souvenirs for the first person
  const firstPerson = getSouvenirs(sum / 3, sortedSouvenirs);
  const souvenirsLeft = getArrayDifference(sortedSouvenirs, firstPerson);

  // get souvenirs for the second person
  const secondPerson = getSouvenirs(sum / 3, souvenirsLeft);

  // get souvenirs for the third person
  const thirdPerson = getArrayDifference(souvenirsLeft, secondPerson);
  const sumOfThirdPerson = thirdPerson.reduce((s, value) => s + value, 0);

  if (sumOfThirdPerson === sum / 3) {
    return 1;
  }
  return 0;
}

module.exports = partitioningSouvenirs;
