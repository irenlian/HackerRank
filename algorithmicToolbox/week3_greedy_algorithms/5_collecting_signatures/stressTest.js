const collectingSignatures = require("./collecting_signatures");

function isEqual(array1, array2) {
  return array1.length === array2.length && array1.every(function(value, index) {
    return value === array2[index]
  })
}

function stressTest() {
  console.log(isEqual(collectingSignatures([[1, 3], [2, 5], [3, 6]]), [3]));
  console.log(isEqual(collectingSignatures([[4, 7], [1, 3], [2, 5], [5, 6]]), [3, 6]));

  process.exit();
}

stressTest();
