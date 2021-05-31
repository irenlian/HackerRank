// https://leetcode.com/problems/maximum-gap

// type Bucket = {
//   min: number;
//   max: number;
// }

/*
 * Solution is based on buckets sort which is approximately O(n) time complexity
 */
function maximumGap(nums) {
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  for (const n of nums) {
    if (n < min) min = n;
    if (n > max) max = n;
  }
  // Bucket size is based on the most positive assumption that all integers have the same gap.
  // If not, the max gap will occur between buckets
  const bucketSize = Math.floor((max - min) / (nums.length - 1)) || 1;

  // Split all numbers into buckets
  const buckets = Array.from({ length: Math.floor((max - min) / bucketSize) + 1 }, () => ({
    min: Number.MAX_SAFE_INTEGER,
    max: Number.MIN_SAFE_INTEGER,
    size: 0, // to exclude empty redundant buckets later
  }));
  for (const n of nums) {
    const bucketIndex = Math.floor((n - min) / bucketSize);
    if (n > buckets[bucketIndex].max) buckets[bucketIndex].max = n;
    if (n < buckets[bucketIndex].min) buckets[bucketIndex].min = n;
    buckets[bucketIndex].size++;
  }

  let maxGap = 0;
  for (let i = 1; i < buckets.length; i++) {
    if (!buckets[i].size) {
      // Remove redundant buckets
      // This helps us avoid to store numbers into buckets at all, so we can just remove empty ones
      buckets.splice(i, 1);
      i--;
      continue;
    }
    if (buckets[i].min - buckets[i - 1].max > maxGap) maxGap = buckets[i].min - buckets[i - 1].max;
  }

  return maxGap;
};

console.log(maximumGap([3,6,9,1]) === 3);
console.log(maximumGap([4,8,0]) === 4);
console.log(maximumGap([11,1,1,1,1,1,1,1,1,1,1,1,111,1,1,1,1,1,1,1,1]) === 100);
