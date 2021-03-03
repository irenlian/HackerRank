const parentheses = require("./maximum_value_of_an_arithmetic_expression");

function calculate(n1, n2, op) {
  switch (op) {
    case '+':
      return n1 + n2;
    case '-':
      return n1 - n2;
    case '*':
      return n1 * n2;
  }
}

// doesn't work
function parenthesesNaive(values, operations) {
  if (values.length === 0) {
    return 0;
  }
  if (values.length === 1) {
    return values[0];
  }

  let max = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < operations.length; i++) {
    const leftPart = parenthesesNaive(values.slice(0, i + 1), operations.slice(0, i));
    const rightPart = parenthesesNaive(values.slice(i + 1), operations.slice(i + 1));
    max = Math.max(max, calculate(leftPart, rightPart, operations[i]));
  }

  return max;
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  console.log(parentheses([1, 5], ['+']) === 6);
  console.log(parentheses([5, 8, 7, 4, 8, 9], ['-', '+', '*', '-', '+']) === 200);

  while (true) {
    const operatorsNumber = Math.floor(Math.random() * 5) + 1;
    let numbers = [];
    for (let i = 0; i < operatorsNumber + 1; i++) {
      numbers.push(Math.floor(Math.random() * 10));
    }
    let operators = [];
    for (let i = 0; i < operators; i++) {
      const ran = Math.random();
      if (ran < 0.35) operators.push('+');
      else if (ran < 0.7) operators.push('-');
      else operators.push('*');
    }
    const res1 = parenthesesNaive(numbers, operators);
    const res2 = parentheses(numbers, operators);

    console.log(operatorsNumber);
    if (res1 !== res2) {
      console.log(`Wrong answer: ${res1} ${res2}`);
      console.log(numbers);
      console.log(operators);
      break;
    } else {
      console.log('OK');
    }
  }
  process.exit();
}

stressTest();
