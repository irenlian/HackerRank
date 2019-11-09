// https://www.hackerrank.com/challenges/jumping-on-the-clouds/problem
function jumpingOnClouds(c) {
	let steps = 0;
	let current = 0;
	while (current < c.length - 1) {
		current += (c[current + 2] == 0) ? 2 : 1;
		steps++;
	}
	return steps;
}
console.log(jumpingOnClouds([0, 0, 1, 0, 0, 1, 0]));