const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
  const [capacity, barsNumber] = line.toString().split(' ').map(Number);
  rl.once('line', (line) => {
    const goldenBars = line.toString().split(' ').map(Number);

    console.log(maximumAmountOfGold(capacity, goldenBars));
    process.exit();
  });
});

/**
 *
 * Description: We have an array of golden bars that we can take, but no more than the capacity.
 * We need to combine bars, as we cannot split them into parts. And also they have the same value.
 *
 * Solution: As it is a discrete knapsack problem, so we cannot use greedy algorithm,
 * we are going to use the dynamic programming approach.
 * At first we need to define the subproblem - max weight that can be taken for each of the capacity.
 * I create 2D matrix to store the subproblem results.
 * For each of the knapsack capacity I'm trying to recalculate the weight in case the specific bar would be taken.
 * So the number will be equal the result from the previous row if we don't take the bar,
 * and will be more if we sum the previous line result for knapsack smaller by weight of the current bar and the current bar.
 * In this way the result of our problem depends on the smaller knapsacks results and previous number of bars.
 *
 * The time complexity is O(n*m), where n - is the number of bars and m - is the capacity
 *
 * @param capacity - number of the maximum weight that can be taken
 * @param bars - array with weight of each of the golden bars
 * @returns maxGold - number of the maximum weight of bars that can be taken combining the particular bars
 */

function maximumAmountOfGold(capacity, bars) {
  const results = [new Array(capacity + 1).fill(0)];

  for (let i = 1; i <= bars.length; i++) {
    const barIndex = i - 1;
    results[i] = [0];
    for (let j = 1; j <= capacity; j++) {
      results[i][j] = results[i - 1][j];
      let previous = results[i - 1][j - bars[barIndex]];
      if (previous !== undefined
        && previous + bars[barIndex] <= capacity
        && previous + bars[barIndex] > results[i - 1][j]) {
        results[i][j] = previous + bars[barIndex];
      }
    }
  }

  return results[bars.length][capacity];
}

module.exports = maximumAmountOfGold;
