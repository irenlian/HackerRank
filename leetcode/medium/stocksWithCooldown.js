// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/

// IN PROGRESS

function getPossibleProfitForBuyingPoint(prices) {
  let max = -1;
  let profitHistory = [];
  for (let i = prices.length - 1; i >= 0; i--) {
    if (max === -1 || prices[i] > max) {
      max = prices[i];
    }
    profitHistory[i] = max - prices[i];
  }
  return profitHistory;
}

function maxProfit(prices) {
  let min = -1;
  let profitHistory = getPossibleProfitForBuyingPoint(prices);
  let profit = 0;
  let futureProfit = 0;
  for (let i = 0; i < prices.length; i++) {
    const profitIfSellNextTime = prices[i + 1] - min + (i < prices.length - 3 ? profitHistory[i + 3] : 0);
    const profitIfSellNow = prices[i] - min + profitHistory[i + 2];
    if ((min === -1 && i < prices.length - 1 && prices[i + 1] > prices[i]) || prices[i] < min) {
      //set buying price
      min = prices[i];
      futureProfit = profitHistory[i];
    } else if (min !== -1 && i < prices.length - 2 && profitIfSellNow >= profitIfSellNextTime && profitIfSellNow >= futureProfit) {
      // decide to sell earlier
      profit += prices[i] - min;
      min = -1;
      i += 1; // cooldown
    } else if (min !== -1 && (i === prices.length - 1 || futureProfit <= prices[i] - min)) {
      // decide to sell
      profit += prices[i] - min;
      min = -1;
      i += 1; // cooldown
    }
  }
  return profit;
}

// console.log(maxProfit([1,2,3]) === 2);
// console.log(maxProfit([3,2,1]) === 0);
// console.log(maxProfit([1,2,3,0,2]) === 3);
// console.log(maxProfit([6,1,3,2,4,7]) === 6);
// console.log(maxProfit([7,1,5,3,6,4]) === 5);
// console.log(maxProfit([6,2,3,1,4,7]) === 6);
// console.log(maxProfit([1]) === 0);
console.log(maxProfit([1,2,4,2,5,7,2,4,9,0,9]) === 15);
