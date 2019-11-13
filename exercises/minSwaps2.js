// https://www.hackerrank.com/challenges/minimum-swaps-2/problem
var fs = require('fs');
var swaps = 0;
function swap(items, firstIndex, secondIndex) {
	if (firstIndex === secondIndex)
		return;
    const temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
	items[secondIndex] = temp;
	swaps++;
}

function minimumSwaps(arr) {
	swaps = 0;
	for (let i = 0; i < arr.length - 1; i++) {
		if (arr[i] === i + 1)
			continue;
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[j] === i + 1) {
				swap(arr, i, j);
				break;
			}
		}
	}
	return swaps;
}

console.log(minimumSwaps([4, 8, 3, 1, 2, 7, 5, 9, 6]));
console.log(minimumSwaps([4, 3, 1, 2]));
console.log(minimumSwaps([2, 3, 4, 1, 5]));
console.log(minimumSwaps([1, 3, 5, 2, 4, 6, 7]));
const readLine = fs.readFileSync('input10.txt', 'utf8');
const arr = readLine.split(' ').map(arrTemp => parseInt(arrTemp, 10));
console.log(minimumSwaps(arr));