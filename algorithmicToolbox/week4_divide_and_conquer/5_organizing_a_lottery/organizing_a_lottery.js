const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', line => {
  const [rangesCount, betsCount] = line.toString().split(' ').map(Number);
  const ranges = [];
  let count = 0;

  rl.on('line', line => {
    ranges.push(readLine(line));

    if (++count >= rangesCount) {
      rl.on('line', line => {
        const bets = line.toString().split(' ').map(Number);
        console.log(organizingLottery(ranges, bets));
        process.exit();
      });
    }
  });
});

function readLine(line) {
    const l = parseInt(line.toString().split(' ')[0], 10);
    const h = parseInt(line.toString().split(' ')[1], 10);

    return [l, h];
}

// function mergeAxis(axis1, axis2) {
//   let i = 0, j = 0;
//   let result = [];
//
//   while (i < axis1.length || j < axis2.length) {
//     if (!axis2[j] || (axis1[i] && axis1[i].key < axis2[j].key)) {
//       result.push(axis1[i++]);
//     } else if (axis1[i] && axis1[i].key === axis2[j].key) {
//       axis1[i].value += axis2[j].value;
//       result.push(axis1[i++]);
//       j++;
//     } else {
//       let overtake = 0;
//       let k = i;
//       for (let k = i; k < axis1.length && j + 1 < axis2.length; k++) {
//         if (axis1[k].key < axis2[j + 1].key) {
//           axis1[k].value++;
//           overtake++;
//         }
//       }
//       if (result.length > 0 && overtake) {
//         axis2[j].value += result[result.length - 1].value;
//       }
//       result.push(axis2[j++]);
//     }
//   }
//
//   return result;
// }

// function insertRange(initial, range, left, right) {
//   if (initial.length === 0) {
//     return [{ key: range[0], value: 1 }, { key: range[1], value: 0 }];
//   }
//   // if (initial.length === 2) {
//     return mergeAxis(initial, [{ key: range[0], value: 1 }, { key: range[1], value: 0 }]);
//   // }
//   // const middle = Math.floor((right - left) / 2) + left;
//   //
//   // const res1 = insertRange(initial, range, left, middle);
//   // const res2 = insertRange(initial, range, middle + 1, right);
//   // return mergeAxis(res1, res2);
// }
//
// function createSortedArrayOfRanges(ranges) {
//   let axis = [];
//   for (let i = 0; i < ranges.length; i++) {
//     axis = insertRange(axis, ranges[i], 0, axis.length - 1);
//   }
//   return axis;
// }


function sortAxis(axis) {
  if (axis.length <= 1) {
    return axis;
  }
  const middle = Math.floor(axis.length / 2);

  const axis1 = sortAxis(axis.slice(0, middle));
  const axis2 = sortAxis(axis.slice(middle));

  let i = 0, j = 0;
  let result = [];

  while (i < axis1.length || j < axis2.length) {
    if (!axis2[j] || (axis1[i] && axis1[i].key < axis2[j].key)) {
      if (result.length > 0 && result[result.length - 1].open) {
        axis1[i].value += result[result.length - 1].value;
      }
      result.push(axis1[i++]);
    } else if (axis1[i] && axis1[i].key === axis2[j].key) {
      axis1[i].value += axis2[j].value;
      result.push(axis1[i++]);
      j++;
    } else {
      if (axis2[j].open) {
        for (let k = i; k < axis1.length && j + 1 < axis2.length; k++) {
          if (axis1[k].key < axis2[j + 1].key) {
            axis1[k].value++;
          }
        }
      }
      if (result.length > 0 && result[result.length - 1].open) {
        axis2[j].value += result[result.length - 1].value;
      }
      result.push(axis2[j++]);
    }
  }

  return result;
}

function createSortedArrayOfRanges(ranges) {
  let axis = [];
  for (let i = 0; i < ranges.length; i++) {
    axis.push({ key: ranges[i][0], value: 1, open: true });
    axis.push({ key: ranges[i][1], value: 0, open: false });
  }
  return sortAxis(axis);
}

function organizingLottery(ranges, bets) {
  const axis = createSortedArrayOfRanges(ranges);
  return axis;
}

module.exports = organizingLottery;
