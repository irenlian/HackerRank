// https://leetcode.com/problems/open-the-lock

function openLock(deadends, target) {
  const locks = new Set(deadends);
  const seen = new Set();
  const queue = ['0000', null];
  let depth = 0;
  while (queue.length) {
    const node = queue.shift();
    if (node == null) {
      depth++;
      if (queue.length !== 0)
        queue.push(null);
    } else if (node === target) {
      return depth;
    } else if (!locks.has(node)) {
      for (let i = 0; i < 4; i++) {
        for (let j = -1; j < 2; j++) {
          const str = [...node];
          str[i] = parseInt(str[i], 10) + j;
          if (str[i] === -1) str[i] = 9;
          if (str[i] === 10) str[i] = 0;
          str[i] = str[i].toString();
          const changed = str.join('');
          if (!seen.has(changed)) {
            seen.add(changed);
            queue.push(changed);
          }
        }
      }
    }
  }
  return -1;
};

console.log(openLock(["1001"], "0001") === 1);
console.log(openLock(["0201","0101","0102","1212","2002"], "0202") === 6);
console.log(openLock(["8888"], "0009") === 1);
console.log(openLock(["8887","8889","8878","8898","8788","8988","7888","9888"], "8888") === -1);
console.log(openLock(["0000"], "8888") === -1);
