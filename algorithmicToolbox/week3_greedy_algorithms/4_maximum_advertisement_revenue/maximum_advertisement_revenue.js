const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', line => {
  rl.once('line', line => {
    const profitPerClick = line.toString().split(' ').map(Number);

    rl.once('line', line => {
      const clicksPerDay = line.toString().split(' ').map(Number);

      console.log(maximumAdvertisementRevenue(profitPerClick, clicksPerDay));
    });
  });
});

function maximumAdvertisementRevenue(profit, clicks) {
  const sortedProfit = profit.sort((a, b) => a - b);
  const sortedClicks = clicks.sort((a, b) => a - b);
  return sortedProfit.reduce((sum, profitPerDay, index) => sum + profitPerDay * sortedClicks[index], 0);
}

module.exports = maximumAdvertisementRevenue;
