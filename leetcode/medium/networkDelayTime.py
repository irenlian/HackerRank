# https://leetcode.com/problems/network-delay-time/

import heapq

# Dijkstra's algorithm
# Time Complexity: O(N + E*logN) - N - number of nodes and E - number of edges
# Space Complexity: O(N + E)
class Solution:
  def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
    # create array of size
    adj = [None] * (n + 1)
    for [source, destination, time] in times:
      if adj[source] is None:
        adj[source] = []
      adj[source].append((destination, time))
    # priority queue with the starting node
    pq = [k]
    signalTime = [sys.maxsize for i in adj]
    signalTime[0] = 0
    signalTime[k] = 0
    while len(pq):
      nodeIndex = heapq.heappop(pq)
      currentEdges = adj[nodeIndex]
      if currentEdges is None:
        continue
      currentTime = signalTime[nodeIndex]
      for [destination, time] in currentEdges:
        if (signalTime[destination] > time + currentTime):
          signalTime[destination] = time + currentTime
          heapq.heappush(pq, destination)
    maxTime = 0
    for time in signalTime:
      maxTime = max(maxTime, time)
    return maxTime if maxTime < sys.maxsize else -1
