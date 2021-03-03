function original(order, k) {
    // Fill the matrix of possible orders fulfilment
    const matrix = [...Array(order.length + 1).keys()].map(order => Array(k + 1).fill(0));
    for (let i = 1; i <= order.length; i++) {
      const currentOrder = order[i - 1];
      for (let j = 1; j <= k; j++) {
        matrix[i][j] = matrix[i - 1][j];
        if (j - currentOrder >= 0
          && matrix[i - 1][j - currentOrder] + currentOrder > matrix[i][j]) {
          matrix[i][j] = matrix[i - 1][j - currentOrder] + currentOrder;
        }
      }
    }
    // Backtrack on which orders exactly have we fulfilled
    let i = order.length;
    let j = k;
    let ordersFulfilled = 0;
    while (i > 0 && j > 0) {
      const currentOrder = order[i - 1];
      if (matrix[i][j] === matrix[i - 1][j]) {
        i--;
      } else {
        ordersFulfilled++;
        j -= currentOrder;
        i--;
      }
    }
    return ordersFulfilled;
}

function filledOrders(order, k) {
  const orderSorted = order.sort((a, b) => a - b);
  let ordersFulfilled = 0;
  let i = 0;
  while (k - orderSorted[i] >= 0) {
    k -= orderSorted[i];
    i++;
    ordersFulfilled++;
  }
  return ordersFulfilled;
}

function compareArrays(origin, target) {
  if (!origin || !target) {
    console.log('Array was not provided');
    return false;
  }
  if (origin.length !== target.length) {
    console.log(`Different length ${origin.length} !== ${target.length}`);
    return false;
  }

  for (let i = 0; i < origin.length; i++){
    if (origin[i] != target[i]){
      console.log(`Different arrays at index ${i}: ${origin[i]} !== ${target[i]}`);
      return false;
    }
  }
  return true;
}

function compareObjects(origin, target) {
  if (!origin || !target) {
    console.log('Object was not provided');
    return false;
  }
  if (typeof origin !== 'object' || typeof target !== 'object') {
    console.log('The function expected only objects');
    return false;
  }
  if (JSON.stringify(origin) !== JSON.stringify(target)){
    console.log('Different objects');
    return false;
  }
  return true;
}
function longestSubarrayOld(arr) {
  // initialize the pointers for iterations
  let i = 0, j = 0;
  // store the result value
  let longestSubstring = 0;
  let used = [];
  while (j < arr.length) {
    // check whether this integer can be calculated in the subarray length
    if (Object.keys(map).length < 2 && map[arr[j]] === undefined) {
      if (Object.keys(map).length === 1 && Math.abs(Object.keys(map)[0] - arr[j]) > 1) {
        map = {
          [arr[j]]: j,
        };
        i = j;
        j++;
      } else {
        map[arr[j]] = j;
        j++;
      }
    } else if (map[arr[j]] !== undefined) {
      map[arr[j]] = j;
      j++;
    } else if (Object.keys(map).length >= 2 && map[arr[j]] === undefined) {
      // if we met the new value we should save current progress
      if (j - i > longestSubstring) {
        longestSubstring = j - i;
      }
      // check whether we can keep the previous value
      if (Math.abs(arr[j] - arr[j - 1]) === 1) {
        const valueToRemove = Object.keys(map).find(key => key !== arr[j - 1]);
        i = map[valueToRemove] + 1;
        delete map.value;
      } else {
        map = {
          [arr[j]]: j,
        };
        i = j;
        j++;
      }
      j++;
    }
  }
  return longestSubstring;
}
function longestSubarray(arr) {
  // initialize the pointers for iterations
  let i = 0, j = 0;
  // store the result value
  let longestSubstring = 0;
  let used = [];
  while (j < arr.length) {
    const item = used.find(item => item.key === arr[j]);
    if (!used.length || (used.length === 1 && Math.abs(used[0].key - arr[j]) === 1)) {
      used.push({
        key: arr[j],
        start: j,
        end: j,
      });
      j++;
    } else if (item) {
      item.end = j++;
    } else {
      if (longestSubstring < j - used[0].start) {
        longestSubstring = j - used[0].start;
      }
      if (Math.abs(used[used.length - 1].key - arr[j]) === 1) {
        i = used[used.length - 1].start;
        used.splice(0, 1);
      } else {
        i = j;
        used = [];
      }
      used.push({
        key: arr[j],
        start: j,
        end: j,
      });
      j++;
    }
  }
  if (used[0] && longestSubstring < j - used[0].start) {
    longestSubstring = j - used[0].start;
  }
  return longestSubstring;
}
/**
 * Stress test was created to generate more tests and compare two different solutions: fast and naive
 */
function stressTest() {
  const inputs = [
    [2, 2, 2, 3, 2, 3, 2, 1, 1, 2, 1, 2, 1, 2],
    [0, 0, 3, 3, 3, 1, 1, 2, 2],
    [0, 0, 0, 4, 4],
    [0],
    [0, 1, 1, 4, 1, 2, 2, 4],
    [],
    [1, 2, 3],
    [4, 4, 4, 4],
    [0, 1, 2, 1, 2, 3],
    [1, 1, 1, 3, 3, 2, 2],
  ];
  const outputs = [
    8, 4, 3, 1, 3, 0, 2, 4, 4, 4
  ];

  inputs.forEach((input, index) => {
    console.log(`===============Test ${index}===============`)

    const res = longestSubarray(input)
    console.log(res)
    if (res !== outputs[index]){
      console.log(`Error with input ${input}: result - ${res}, should be - ${outputs[index]}`)
      return null;
    }
  })
  process.exit();
}

stressTest();
