function binarySearch(nums, target, range, bound) {
  if (range[1] - range[0] === 0) return -1;
  if (range[1] - range[0] === 1 && nums[range[0]] === target) return range[0];
  if (range[1] - range[0] === 1) return -1;
  if (nums[range[0]] > target || nums[range[1] - 1] < target) return -1;

  let middle = Math.round((range[1] - range[0]) / 2) + range[0];
  if (middle === range[1]) middle--;
  if (nums[middle] === target) {
    if (bound === 'lower') {
      const lower = binarySearch(nums, target, [range[0], middle], bound);
      return lower !== -1 ? lower : middle;
    } else {
      const upper = binarySearch(nums, target, [middle + 1, range[1]], bound);
      return upper !== -1 ? upper : middle;
    }
  }
  if (nums[middle] > target) {
    return binarySearch(nums, target, [range[0], middle], bound);
  }
  return binarySearch(nums, target, [middle + 1, range[1]], bound);
}

function searchRange(nums, target) {
  return [binarySearch(nums, target, [0, nums.length], 'lower'), binarySearch(nums, target, [0, nums.length], 'upper')];
};

console.log(searchRange([5,7,7,8,8,10], 8));
console.log(searchRange([-1,5,6,8,100], 8));
