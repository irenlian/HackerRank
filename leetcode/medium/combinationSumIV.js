// https://leetcode.com/problems/combination-sum-iv/

const memo = { [BigInt(0).toString()]: BigInt(1), [BigInt(1).toString()]: BigInt(1) };

function factorial(n: bigint): bigint {
  if (memo[n.toString()]) return memo[n.toString()];
  const result = n * factorial(n - 1n);
  memo[n.toString()] = result;
  return result;
}

type Permutation = { [key:string]: number };

function getPermutations(target: number, nums: number[], current: { sum: number, elements: Permutation }): Permutation[] {
  const { sum, elements } = current;
  if (sum === target) {
    return [elements];
  }
  if (sum > target) {
    return [];
  }

  let permutations = [];
  for (let i = 0; i < nums.length; i++) {
    if (sum + nums[i] > target) {
      break;
    }
    const changed = { ...elements, [nums[i]]: (elements[nums[i]] || 0) + 1 };
    permutations = [
      ...permutations,
      ...getPermutations(
        target,
        nums.slice(i),
        { sum: sum + nums[i], elements: changed }
      )
    ];
  }
  return permutations;
}

// Timeout solution
function combinationSum4(nums: number[], target: number): number {
  const sorted = nums.sort((a, b) => a - b);
  const permutations = getPermutations(target, sorted, { sum: 0, elements: {} });

  let combinations = BigInt(0);
  for (let i = 0; i < permutations.length; i++) {
    const size = Object.values(permutations[i]).reduce((sum, quantity) => sum + BigInt(quantity), 0n);
    const multiplication = Object.values(permutations[i]).reduce((mult, quantity) => mult * factorial(BigInt(quantity)), 1n);
    combinations += factorial(size) / multiplication;
  }
  return Number(combinations);
};
