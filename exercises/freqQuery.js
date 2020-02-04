// https://www.hackerrank.com/challenges/frequency-queries/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=dictionaries-hashmaps

const insertion = (item, map) => {
  if (map[item]) {
    map[item] += 1;
  } else {
    map[item] = 1;
  }
  return null;
};

const removing = (item, map) => {
  if (map[item]) {
    map[item] -= 1;
  }
  return null;
};

const frequency = (freqCount, map) => {
  for (const [ number, freq ] of Object.entries(map)) {
    if (freq === freqCount) return 1;
  }
  return 0;
};

const operationMap = {
  1: insertion,
  2: removing,
  3: frequency,
};

function freqQuery(queries) {
  const map = {};
  return queries.reduce((output, operation) => {
    const operationOutput = operationMap[operation[0]](operation[1], map);
    if (operationOutput !== null) output.push(operationOutput);
    return output;
  }, []);
}
module.exports = freqQuery;
