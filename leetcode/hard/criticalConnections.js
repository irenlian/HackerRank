function dfs(graph, critical, node, rank) {
  if (node.rank !== null) {
    return node.rank;
  }
  node.rank = rank;
  let minRank = rank + 1;
  for (let connection of node.connections) {
    // skip parent
    if (graph[connection].rank === rank - 1) continue;
    //
    const recursiveRank = dfs(graph, critical, graph[connection], rank + 1);
    if (recursiveRank <= rank) {
      const u = Math.min(node.val, connection), v = Math.max(node.val, connection);
      delete (critical[u])[v];
    }
    minRank = Math.min(minRank, recursiveRank);
  }
  return minRank;
}

function criticalConnections(n, connections) {
  const graph = {};
  const critical = {};
  for (let connection of connections) {
    const u = Math.min(...connection), v = Math.max(...connection);
    critical[u] = critical[u] ? { ...critical[u], [v]: 1 } : { [v]: 1 };
    if (graph[connection[0]]) {
      graph[connection[0]].connections.push(connection[1]);
    } else {
      graph[connection[0]] = {
        val: connection[0],
        connections: [connection[1]],
        rank: null,
      };
    }
    //
    if (graph[connection[1]]) {
      graph[connection[1]].connections.push(connection[0]);
    } else {
      graph[connection[1]] = {
        val: connection[1],
        connections: [connection[0]],
        rank: null,
      };
    }
    //
  }
  const root = graph[0];
  dfs(graph, critical, root, 0);
  const result = [];
  for (let u in critical) {
    for (let v in critical[u]) {
      result.push([parseInt(u), parseInt(v)]);
    }
  }
  return result;
};

console.log(criticalConnections(4,
  [[0,1],[1,2],[2,0],[1,3]]));
