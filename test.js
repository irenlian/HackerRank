// function processData(input) {
    const n = input[0];
    const r = input[2];
    const c = input[4];
    const table = input.substring(6);
    let index = table.indexOf('p');
    index = index - Math.floor(index / n) + 1;
    // console.log(table);
    // console.log(index);
    const {row, column} = {row: Math.floor(index / n), column: index % n };
    // console.log(row);
    // console.log(column);
    if ((r == 3 && c == 2 && row == 3) || (row == 0 && column == 4))
        console.log("vert " + Math.abs(column - c) + ' ' + Math.abs(row - r));
    if (Math.abs(column - c) > Math.abs(row - r) || Math.abs(column - c) == 1) {
        // if (Math.abs(column - c) == 1)
        //     console.log("vert " + Math.abs(column - c) + ' ' + Math.abs(row - r));
        if (column - c > 0)
            console.log("RIGHT");
        else
            console.log("LEFT");
    } else {
        // console.log("horiz");
        if (row - r > 0)
            console.log("DOWN");
        else
            console.log("UP");
    }
    // for (let i = 0; i < input.length; i++) {
    //     console.log(i +' = ' + input[i]);
    // }
    // console.log(n);
    // console.log(r);
    // console.log(c);
// } 

// process.stdin.resume();
// process.stdin.setEncoding("ascii");
// _input = "";
// process.stdin.on("data", function (input) {
//     _input += input;
// });

// process.stdin.on("end", function () {
//    processData(_input);
// });


// function howManyGames(p, d, m, s) {
// 	// Return the number of games you can buy
// 	let num = 0;
//     while (s > 0) {
//         s -= p;
//         if (s >= 0) num ++;
//         if (p - d >= m) p -= d;
//         else p = m;
//     }
//     return num;
// }

// howManyGames(20, 3, 20, 80);

function isSunny(x, y, r) {
	for (let j = 0; j < y.length; j++) {
		if (x >= y[j] - r[j] && x <= y[j] + r[j])
			return false;
	}
	return true;
}

function countSunny(p, x, y, r) {
	let sunnyPeople = 0;
	for (let i = 0; i < x.length; i++) {
		if (isSunny(x[i], y, r))
			sunnyPeople += p[i];
	}
	return sunnyPeople;
}

function maximumPeople(p, x, y, r) {
    // Return the maximum number of people that will be in a sunny town after removing exactly one cloud.
	let max = 0;
	if (p.length !== x.length || y.length !== r.length)
        return 0;
	if (y.length == 0)
		max = countSunny(p, x, y, r);
	for (let i = 0; i < y.length; i++) {
		const draftY = [...y.slice(0, i), ...y.slice(i + 1)];
		const draftR = [...r.slice(0, i), ...r.slice(i + 1)];
		const temp = countSunny(p, x, draftY, draftR);
		if (temp > max)
			max = temp;
	}
	return max;
}

maximumPeople(
	[10, 100, 100],
	[5, 6, 100],
	[100, 13, 2, 65, 3, 56, 2],
	[2, 45, 2, 52, 5, 1, 1])