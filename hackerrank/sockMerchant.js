// https://www.hackerrank.com/challenges/sock-merchant/problem
// Complete the sockMerchant function below.
function sockMerchant(n, ar) {
  if (n !== ar.length) { return 0; }
  let pairs = 0;
  const map = ar.reduce((map, color) => {
    map[color] = (map[color]) ? ++map[color] : 1;
    return map;
  }, {});
  for (const color in map) {
    pairs += Math.floor(map[color] / 2);
  }
  return pairs;
}

console.log(sockMerchant(9,
  [10, 20, 20, 10, 10, 30, 50, 10, 20]));
