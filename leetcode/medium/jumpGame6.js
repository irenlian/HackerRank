//https://leetcode.com/problems/jump-game-vi/
const { MinPriorityQueue, MaxPriorityQueue } = require('@datastructures-js/priority-queue');
const { DoublyLinkedList } = require('@datastructures-js/linked-list');

// Greedy approach doesn't work

// function maxResult(nums, k) {
//   let score = nums[0];
//   let i = 0;
//   while (i < nums.length - 1) {
//     let stop = i + 1;
//     for (let j = 1; i + j < nums.length && j <= k; j++) {
//       if (nums[i + j] <= 0 && nums[i + j] >= nums[stop]) {
//         stop = i + j;
//       } else if (nums[i + j] > 0 || i + j === nums.length - 1) {
//         stop = i + j;
//         break;
//       }
//     }
//     score += nums[stop];
//     i = stop;
//   }
//   return score;
// };

// Dynamic Programming O(N*k) - too long

// function maxResult(nums: number[], k: number): number {
//   const dp: number[] = [nums[0]];
//   for (let i = 1; i < nums.length; i++) {
//     dp[i] = Math.max(...dp.slice(Math.max(0, i - k))) + nums[i];
//   }
//   return dp[nums.length - 1];
// };

// Dynamic Programming O(N) - with double linked list

// function maxResult(nums, k) {
//   const dp = [nums[0]];
//   const dq = new DoublyLinkedList();
//   dq.insertLast(0);
//   for (let i = 1; i < nums.length; i++) {
//     // pop the old index
//     while (dq.head() && dq.head()._value < i - k) {
//       dq.removeFirst();
//     }
//
//     dp[i] = dp[dq.head()._value] + nums[i];
//
//     // pop the smaller value
//     while (dq.tail() && dp[i] >= dp[dq.tail()._value]) {
//       dq.removeLast();
//     }
//     dq.insertLast(i);
//   }
//   return dp[nums.length - 1];
// };

// With array
function maxResult(nums, k) {
  const dp = [nums[0]];
  const dq = [];
  dq.push(0);
  for (let i = 1; i < nums.length; i++) {
    // pop the old index
    while (dq.length && dq[0] < i - k) {
      dq.splice(0, 1);
    }

    dp[i] = dp[dq[0]] + nums[i];

    // pop the smaller value
    while (dq.length && dp[i] >= dp[dq[dq.length - 1]]) {
      dq.splice(dq.length - 1, 1);
    }
    dq.push(i);
  }
  return dp[nums.length - 1];
};

console.log(maxResult([10,-5,-2,4,0,3],  3) === 17);
console.log(maxResult([1,-1,-2,4,-7,3], 2) === 7);
console.log(maxResult([1,-5,-20,4,-1,3,-6,-3], 2) === 0);
console.log(maxResult([1], 2) === 1);
console.log(maxResult([-1], 2) === -1);
console.log(maxResult([1,-5,-5,-5,0], 4) === 1);
console.log(maxResult([1,-5,-5,5,0], 4) === 6);
console.log(maxResult([1,-5,-5,-5,-10], 4) === -9);
console.log(maxResult([-1,-5,-5,-5,-10], 4) === -11);
console.log(maxResult([-1,-5,5,-5,-10], 4) === -6);
console.log(maxResult([-1,-5,5,-5,-10], 1) === -16);
console.log(maxResult([10,-1,-2,-3,4,3],  2) === 15);
