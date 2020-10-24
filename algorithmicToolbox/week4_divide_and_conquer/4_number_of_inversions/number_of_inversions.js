const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', line => {
  const arr = line.toString().split(' ').slice(1).map(Number);

  rl.once('line', line => {
    const input = line.toString().split(' ').map(Number);

    const { inversions } = getNumberOfInversions(input);
    console.log(inversions);
    process.exit();
  })
});

function getNumberOfInversions(arr = []) {
    if (arr.length < 2) {
        return { array: arr, inversions: 0 };
    }

    const middle = Math.ceil(arr.length / 2);
    const left = getNumberOfInversions(arr.slice(0, middle));
    const right = getNumberOfInversions(arr.slice(middle));

    let inversions = 0;
    let result = [];
    let i = 0, j = 0;
    while (result.length !== arr.length) {
        if (i >= left.array.length) {
            result.push(right.array[j]);
            j++;
        } else if (j >= right.array.length || left.array[i] <= right.array[j]) {
            result.push(left.array[i]);
            i++;
        } else if (left.array[i] > right.array[j]) {
            result.push(right.array[j]);
            j++;
            inversions += left.array.length - i;
        }
    }
    inversions += left.inversions + right.inversions;

    return { inversions, array: result };
}

module.exports = getNumberOfInversions;
