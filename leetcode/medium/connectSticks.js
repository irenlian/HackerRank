// https://leetcode.com/problems/minimum-cost-to-connect-sticks

function connectSticks(sticks) {
  sticks.sort((a, b) => a - b);
  if (sticks.length <= 1) return 0;
  let sum = sticks[0] + sticks[1];
  let temp = sticks[0] + sticks[1];
  const queue = [sticks[0] + sticks[1]];
  let i = 2;
  while (i < sticks.length || queue.length > 1) {
    if (i < sticks.length - 1 && (!queue.length || sticks[i + 1] < queue[0])) {
      temp = sticks[i + 1] + sticks[i];
      i += 2;
    } else if (queue.length >= 2 && (i >= sticks.length || queue[1] < sticks[i])) {
      temp = queue.shift() + queue.shift();
    } else {
      temp = queue.shift() + sticks[i];
      i++;
    }
    queue.push(temp);
    sum += temp;
  }
  return sum;
};

console.log(connectSticks([1,1,1,1]) === 8);
console.log(connectSticks([1,1,1,1,100]) === 112);
console.log(connectSticks([1,1,1,1,1,2,100]) === 125);
console.log(connectSticks([5]) === 0);
console.log(connectSticks([1,8,3,5]) === 30);
