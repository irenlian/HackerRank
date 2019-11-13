// https://www.hackerrank.com/challenges/new-year-chaos/problem
module.exports = function minimumBribes(q) {
	let bribes = 0;
	let sortedToIndex = -1;
	do {
    for (let i = sortedToIndex + 1; i < q.length - 1; i++) {
      if (q[i] - (i + 1) > 2)
        return console.log("Too chaotic");
      if (q[i] > q[i + 1]) {
        [q[i], q[i + 1]] = [q[i + 1], q[i]];
        bribes++;
      }
      if (sortedToIndex === i - 1 && q[i] === i + 1)
        sortedToIndex = i;
    }
  } while (sortedToIndex < q.length - 2);
	console.log(bribes);
}
