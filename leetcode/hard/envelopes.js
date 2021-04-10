// https://leetcode.com/problems/russian-doll-envelopes/

function fillRow(dp, maxHeight, row, column) {
  if (!dp[row]) dp[row] = [];
  while (column <= maxHeight) {
    const values = [
      ...(dp[row - 1] ? [dp[row - 1][column]] : []), dp[row][column - 1], 0
    ];

    dp[row][column] = Math.max(...values.filter(v => typeof v === 'number'));
    column += 1;
  }
}

function fillToPoint(dp, [maxWidth, maxHeight], [fromI, fromJ], [toI, toJ]) {
  let i = fromI;
  while (i <= toI) {
    fillRow(dp, i === toI ? toJ : maxHeight, i, i === fromI ? fromJ : 1);
    i += 1;
  }
}

function maxEnvelopes(envelopes) {
  const sorted = [...envelopes].sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1];
  });
  const dp = [];
  let i = 1;
  let j = 0;
  const maxWidth = sorted[sorted.length - 1][0];
  let maxHeight = 1;
  let max = 0;
  for (let k = 0; k < sorted.length; k += 1) {
    const [width, height] = sorted[k];
    // if (i === width && j === height) continue;

    if (height > maxHeight) maxHeight = height;
    fillToPoint(dp, [maxWidth, maxHeight], [i, j + 1], [width, height]);
    [i, j] = [width, height];

    const lastOnPreviousRow = dp[width - 1] && height > 1 ? dp[width - 1][dp[width - 1].length - 1] : 0;
    const values = [
      ...(dp[width - 1] ? [dp[width - 1][height]] : []),
      ...(dp[width - 1] && dp[width - 1][height - 1] !== undefined ? [dp[width - 1][height - 1] + 1] : [lastOnPreviousRow + 1]),
      dp[width][height - 1],
      0
    ];

    dp[width][height] = Math.max(...values.filter(v => typeof v === 'number'));
    max = Math.max(max, dp[width][height]);
  }
  return max;
};

console.log(maxEnvelopes([[1,1],[1,1],[1,1]]) === 1);
console.log(maxEnvelopes([[5,4],[6,4],[6,7],[2,3]]) === 3);
console.log(maxEnvelopes([[5,4]]) === 1);
console.log(maxEnvelopes([[2,1],[3,5],[5,3],[4,4],[4,1],[3,2],[2,3],[1,4],[5,4]]) === 3);
console.log(maxEnvelopes([[46,89],[50,53],[52,68],[72,45],[77,81]]) === 3);
console.log(maxEnvelopes([[10,8],[1,12],[6,15],[2,18]]) === 2);
