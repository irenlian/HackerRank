const maxLoot = require("./fractional_knapsack");

function findExpensiveItem(items) {
  let itemIndex = -1;
  items.forEach((item, i) => {
    if (itemIndex === -1 || item.pricePerWeight > items[itemIndex].pricePerWeight) {
      itemIndex = i;
    }
  });
  return itemIndex;
}

function maxLootNaive(count, capacity, itemsOriginal) {
  const items = [...itemsOriginal];
  let loot = 0, capacityLeft = capacity;
  while (capacityLeft > 0 && items.length > 0) {
    const i = findExpensiveItem(items);
    loot += items[i].value * Math.min(capacityLeft / items[i].weight, 1);
    capacityLeft -= items[i].weight;
    items.splice(i, 1);
  }
  return Number.parseFloat(loot).toFixed(4);
}

/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  while (true) {
    const itemsCount = Math.floor(Math.random() * 100) + 1;
    const knapsackCapacity = Math.floor(Math.random() * 2000);
    const items = [];
    for (let i = 0; i < itemsCount; i++) {
      const value = Math.floor(Math.random() * 1000);
      const weight = Math.floor(Math.random() * 1000);
      items.push(
        {
          value,
          weight,
          pricePerWeight: value / weight || 0,
        }
      );
    }

    const res1 = maxLootNaive(itemsCount, knapsackCapacity, items);
    const res2 = maxLoot(itemsCount, knapsackCapacity, items);

    console.log(itemsCount, knapsackCapacity);
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
