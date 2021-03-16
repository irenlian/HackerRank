//https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/

function maxProfitNaiveRecursive(prices, fee) {
  const buyPrice = prices[0];
  let maxProfit = 0;
  for (let i = 1; i < prices.length; i++) {
    const profitIfSellNow = prices[i] - buyPrice - fee;
    let maxNextProfit = 0;
    for (let j = i + 1; j < prices.length; j++) {
      const nextProfit = maxProfitNaiveRecursive(prices.slice(j), fee);
      if (nextProfit > maxNextProfit) {
        maxNextProfit = nextProfit;
      }
    }
    if (profitIfSellNow + maxNextProfit > maxProfit) {
      maxProfit = profitIfSellNow + maxNextProfit;
    }
  }
  return maxProfit;
}

function maxProfitNaive(prices, fee) {
  let maxProfit = 0;
  for (let i = 0; i < prices.length; i++) {
      const nextProfit = maxProfitNaiveRecursive(prices.slice(i), fee);
      if (nextProfit > maxProfit) {
        maxProfit = nextProfit;
      }
  }
  return maxProfit;
}

// Time Complexity: O(n^2)
// Space Complexity: O(n)
function maxProfitLong(prices, fee) {
  const profit = [0];
  let maxProfit = 0;
  for (let i = 1; i < prices.length; i++) {
    profit[i] = maxProfit;
    for (let j = 0; j < i; j++) {
      const profitIfSellNow = prices[i] - prices[j] - fee;
      const previousProfit = j > 0 ? profit[j - 1] : 0;
      const cumulativeProfit = previousProfit + profitIfSellNow;
      if (cumulativeProfit > profit[i]) {
        profit[i] = cumulativeProfit;
      }
    }
    if (maxProfit < profit[i]) {
        maxProfit = profit[i];
    }
  }
  return profit[profit.length - 1];
}

// Time Complexity: O(n)
// Space Complexity: O(1)
function maxProfit(prices, fee) {
  let cash = 0;
  let hold = -prices[0];
  for (let i = 1; i < prices.length; i++) {
    cash = Math.max(cash, hold + prices[i] - fee);
    hold = Math.max(hold, cash - prices[i]);
  }
  return cash;
}

console.log(maxProfit([1,3,2,8,4,9], 2) === 8);
console.log(maxProfit([9,2,5,6,2], 1) === 3);
console.log(maxProfit([2,3,2,3], 2) === 0);
console.log(maxProfit([2,3], 2) === 0);
console.log(maxProfit([1,3,7,5,10,3], 3) === 6);
console.log(maxProfit([4,5,2,4,3,3,1,2,5,4], 1) === 4);

function test() {
  while (true) {
    const length = Math.round(Math.random() * 8 + 2);
    const prices = Array.from(new Array(length)).map(() => Math.round(Math.random() * 15));
    const fee = Math.round(Math.random() * 10);
    const algo = maxProfit(prices, fee);
    const naive = maxProfitNaive(prices, fee);
    if (algo !== naive) {
      console.log(prices, fee);
      console.log('Correct: ', naive);
      console.log('My answer: ', algo);
      break;
    }
    console.log(true);
  }
}

test();
