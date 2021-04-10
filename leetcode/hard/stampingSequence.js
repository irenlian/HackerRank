// https://leetcode.com/problems/stamping-the-sequence/

function movesToStamp(stamp, target) {
  const allWindows = [];
  const finishedIndices = [];
  const done = [];
  const movesQueue = [];
  for (let i = 0; i <= target.length - stamp.length; i += 1) {
    const todo = [];
    const made = [];
    for (let j = 0; j < stamp.length; j += 1) {
      if (target[i + j] === stamp[j]) {
        made.push(i + j);
      } else {
        todo.push(i + j);
      }
    }
    allWindows[i] = { todo, made };
    if (!todo.length) {
      movesQueue.push(i);
      for (let j = i; j < i + stamp.length; j += 1) {
        if (!done[j]) {
          finishedIndices.push(j);
          done[j] = true;
        }
      }
    }
  }
  while (finishedIndices.length) {
    const index = finishedIndices.pop();
    for (let j = Math.max(0, index-stamp.length+1); j <= Math.min(target.length-stamp.length, index); ++j) {
      let window = allWindows[j];
      if (!window) continue;
      const todoI = window.todo.indexOf(index);
      if (todoI !== -1) {
        window.todo.splice(todoI, 1);
        if (!window.todo.length) {
          for (let m of window.made) {
            if (!done[m]) {
              finishedIndices.push(m);
              done[m] = true;
            }
          }
          if (window.made.length) movesQueue.push(j);
        }
      }
    }
  }
  for (let i = 0; i < target.length; i += 1) {
    if (!done[i]) return [];
  }
  return movesQueue.reverse();
};

console.log(movesToStamp('abc', 'ababc'));
console.log(movesToStamp('abca', 'aabcaca'));
console.log(movesToStamp('aaa', 'aaaaaa'));
console.log(movesToStamp('aaa', 'aaaaaaf'));
console.log(movesToStamp('abc', 'ababcab'));
console.log(movesToStamp('abc', 'babca'));
console.log(movesToStamp('a', 'b'));
console.log(movesToStamp('ab', 'ab'));
console.log(movesToStamp('aaa', 'aa'));
console.log(movesToStamp('aaa', 'aaa'));
