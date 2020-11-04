const maximumAdvertisementRevenue = require("./maximum_advertisement_revenue");

function stressTest() {
  console.log(maximumAdvertisementRevenue([23], [39]) === 897);
  console.log(maximumAdvertisementRevenue([1, 3, -5], [-2, 4, 1]) === 23);
  process.exit();
}

stressTest();
