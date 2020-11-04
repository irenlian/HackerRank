const maximumNumberOfPrizes = require("./maximum_number_of_prizes");

function isEqual(array1, array2) {
  return array1.length === array2.length && array1.every(function(value, index) {
    return value === array2[index]
  })
}

function stressTest() {
  console.log(isEqual(maximumNumberOfPrizes(6), [1, 2, 3]));
  console.log(isEqual(maximumNumberOfPrizes(8), [1, 2, 5]));
  console.log(isEqual(maximumNumberOfPrizes(2), [2]));

  process.exit();
}

stressTest();
