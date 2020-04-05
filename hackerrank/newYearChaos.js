// https://www.hackerrank.com/challenges/new-year-chaos/problem
// For hacherrank should return in stdout
function minimumBribes(queue) {
  let bribes = 0;
  let sortedToIndex = -1;
  const q = [...queue];
  do {
    for (let i = sortedToIndex + 1; i < q.length - 1; i += 1) {
      if (q[i] - (i + 1) > 2) return 'Too chaotic';
      if (q[i] > q[i + 1]) {
        [q[i], q[i + 1]] = [q[i + 1], q[i]];
        bribes += 1;
      }
      if (sortedToIndex === i - 1 && q[i] === i + 1) sortedToIndex = i;
    }
  } while (sortedToIndex < q.length - 2);
  return bribes;
}
module.exports = minimumBribes;
