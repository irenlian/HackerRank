// https://www.hackerrank.com/challenges/ctci-array-left-rotation/problem
function rotLeft(a, d) {
	return [...a.slice(d), ...a.slice(0, d)];
}