// https://leetcode.com/problems/matchsticks-to-square

const SIDES = 4;

function areEqual(sides) {
  const first = sides[0];
  return sides.length === 4 && sides.every(side => side === first);
}

// function getSides(matchsticks, sides, target) {
//   if (!matchsticks.length) {
//     return areEqual(sides);
//   }
//   // if (matchsticks.length > 6) console.log(matchsticks.length);
//   for (let i = 0; i < matchsticks.length; i++) {
//     if (matchsticks[i] > target) return false;
//     const left = [...matchsticks];
//     left.splice(i, 1);
//     for (let j = 0; j < SIDES; j++) {
//       if (sides[j] + matchsticks[i] > target) continue;
//       const copy = [...sides];
//       copy[j] += matchsticks[i];
//       const res = getSides(left, copy, target);
//       if (res) return true;
//     }
//   }
//   return false;
// };

function getSides(matchsticks, sides, target) {
  if (!matchsticks.length) {
    return areEqual(sides);
  }
  const stick = matchsticks[0];
  if (stick > target) return false;
  const left = matchsticks.slice(1);
  for (let j = 0; j < SIDES; j++) {
    if (sides[j] + stick > target) continue;
    const copy = [...sides];
    copy[j] += stick;
    const res = getSides(left, copy, target);
    if (res) return true;
  }
  return false;
};

function makesquare(matchsticks) {
  const sum = matchsticks.reduce((acc, i) => acc + i, 0);
  if (sum % SIDES !== 0 || !sum) return false;
  matchsticks.sort((a, b) => b - a);
  return getSides(matchsticks, [0, 0, 0, 0], sum / SIDES);
};

console.log(makesquare([3,3,3,8,1,1,1,2,2,1,3]) === false);
console.log(makesquare([3,3,3,3,4,1,1,1,1,2,2,1,3]) === true);
console.log(makesquare([1,1,2,2,2]) === true);
console.log(makesquare([3,3,3,3,4]) === false);
console.log(makesquare([1]) === false);
console.log(makesquare([1,1]) === false);
console.log(makesquare([1,1,1,1,0]) === true);
console.log(makesquare([1,1,1,2]) === false);
console.log(makesquare([0]) === false);
console.log(makesquare([0,0,0,0]) === false);
console.log(makesquare([0,0,0,0,1,1,1,1]) === true);
console.log(makesquare([5,5,5,5,4,4,4,4,3,3,3,3]) === true);
