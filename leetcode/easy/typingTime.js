// https://leetcode.com/problems/single-row-keyboard/

function calculateTime(keyboard, word) {
  const mapped = [...keyboard].reduce((m, key, i) => ({ ...m, [key]: i }), {});
  let time = 0;
  let currentIndex = 0;
  for (let i = 0; i < word.length; i++) {
    time += Math.abs(currentIndex - mapped[word[i]]);
    currentIndex = mapped[word[i]];
  }
  return time;
}
