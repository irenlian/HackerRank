//https://leetcode.com/problems/xor-queries-of-a-subarray/

// Time Complexity O(n + m)
// n - initial array length
// m - number of queries

function prefixes(arr) {
  return arr.reduce(
    (prefixes, num) => [...prefixes, prefixes.length ? prefixes[prefixes.length - 1] ^ num : num],
    []
  );
}

function xorQueries(arr, queries) {
  const prs = prefixes(arr);
  return queries.map(query => (query[0] > 0) ? prs[query[1]] ^ prs[query[0] - 1] : prs[query[1]]);
}
