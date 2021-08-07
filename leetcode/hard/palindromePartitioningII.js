//https://leetcode.com/problems/palindrome-partitioning-ii/
function minCut(s) {
  const cutsDp = [];
  const palindromeDp = [];
  for (let end = 0; end < s.length; end++) {
    let minimumCut = end;
    for (let start = 0; start <= end; start++) {
      if (!palindromeDp[start + 1]) palindromeDp[start + 1] = [];
      if (!palindromeDp[start]) palindromeDp[start] = [];
      // check if substring (start, end) is palindrome
      if (s.charAt(start) === s.charAt(end) && (end - start <= 2 ||
        palindromeDp[start + 1][end - 1])) {
        palindromeDp[start][end] = true;
        minimumCut = start == 0 ? 0 : Math.min(minimumCut, cutsDp[start - 1] + 1);
      }
    }
    cutsDp[end] = minimumCut;
  }
  return cutsDp[s.length - 1];
};

minCut("sdfffa");
