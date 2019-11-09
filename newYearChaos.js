// https://www.hackerrank.com/challenges/new-year-chaos/problem
function minimumBribes(q) {
	let bribes = 0;
	for (let i = 0; i < q.length; i++) {
		if (q[i] - (i + 1) > 2)
			return console.log("Too chaotic");
		
	}
	console.log(bribes);
}
const readLine = "1 2 5 3 7 8 6 4";
const q = readLine.split(' ').map(qTemp => parseInt(qTemp, 10));

minimumBribes(q);