const maximumSalary = require("./maximum_salary");

function maximumSalaryNaive(items) {
  if (items.length === 1) {
    return items[0] + '';
  }
  let sum = '0';

  for (let i = 0; i < items.length; i++) {
    const option = items[i] + maximumSalaryNaive([...items.slice(0, i), ...items.slice(i + 1)]);
    if (option.length < sum.length) {
      sum = option;
    } else if (option > sum) {
      sum = option;
    }
  }
  return sum;
}

function stressTest() {
  while (true) {
    const itemsCount = Math.floor(Math.random() * 10) + 1;
    const items = [];
    for (let i = 0; i < itemsCount; i++) {
      const length = Math.floor(Math.random() * 5) + 1;
      let num = '';
      for (let j = 0; j < length; j++) {
        num += Math.floor(Math.random() * 10) % 10 + 1;
      }
      items.push(num);
    }

    const res1 = maximumSalaryNaive(items);
    const res2 = maximumSalary(items);

    console.log(itemsCount);
    if (res1 !== res2) {
      console.log(items);
      console.log(`Wrong answer: ${res1} ${res2}`);
      break;
    } else {
      console.log('OK');
    }
  }

  process.exit();
}

stressTest();
