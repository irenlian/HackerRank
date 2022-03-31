class Solution:
    def __init__(self):
      self.memo = dict({})

    def safe(self, m: int, length: int, minSum: int):
      if not m in self.memo:
        self.memo[m] = dict({})
      self.memo[m][length] = minSum

    def retrieve(self, m: int, length: int) -> int:
      if m in self.memo and length in self.memo[m]:
        return self.memo[m][length]
      return None

      # Second try with dymanic programming
    def splitArray(self, nums: List[int], m: int) -> int:
      if not self.retrieve(m, len(nums)) is None:
        return self.retrieve(m, len(nums))
      if m == 1:
        return sum(nums)
      minSum = sys.maxsize
      currentSum = 0
      for i in range(len(nums))[:(m - 1) * -1]:
        currentSum += nums[i]
        rest = nums[i + 1:]
        resMinSum = self.splitArray(rest, m - 1)
        self.safe(m - 1, len(rest), resMinSum)
        largestSum = max(resMinSum, currentSum)
        minSum = min(minSum, largestSum)
      return minSum

      # First try with sliding window
    # def splitArray(self, nums: List[int], m: int) -> int:
    #   split = [[nums[x], x, x] for x in range(m)]
    #   largestSum = 0
    #   for i, num in enumerate(nums):
    #     if i < m: continue
    #     smallestSum = min(split)[0]
    #     split[-1] = [split[-1][0] + num, split[-1][1], i]
    #     largestSum = max(split)[0]
    #     splitIndex = m - 1
    #     while splitIndex > 0 and split[splitIndex - 1][0] + nums[split[splitIndex][1]] <= largestSum:
    #       movedNum = nums[split[splitIndex][1]]
    #       split[splitIndex][1] += 1
    #       split[splitIndex - 1][2] +=1
    #       split[splitIndex][0] -= movedNum
    #       split[splitIndex - 1][0] += movedNum
    #       largestSum = max(split)[0]
    #       splitIndex -= 1
    #   return max(split)[0]
