//https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/

// type Node = {
//   val: number;
//   visited: boolean;
//   children: Node[];
// }

function countComponents(n, edges) {
  const nodes = Array.from(new Array(n)).map((v, i) => ({ val: i, visited: false, children: [] }));
  for (let edge of edges) {
    nodes[edge[0]].children.push(nodes[edge[1]]);
    nodes[edge[1]].children.push(nodes[edge[0]]);
  }
  let lastVisited = -1;
  let components = 0;
  const stack = [];
  while (lastVisited < n - 1) {
    while (stack.length) {
      const current = stack.pop();
      for (let child of current.children) {
        if (!child.visited) {
          child.visited = true;
          stack.push(child);
        }
      }
    }
    for (let i = lastVisited + 1; i < n; i++) {
      if (!nodes[i].visited) {
        lastVisited = i;
        stack.push(nodes[i]);
        nodes[i].visited = true;
        components++;
        break;
      }
      lastVisited = i;
    }
  }
  return components;
};

console.log(countComponents(5, [[0,1],[1,2],[3,4]]) === 2);
console.log(countComponents(5, [[0,1],[1,2],[2,3],[3,4]]) === 1);
console.log(countComponents(5, [[0,1],[1,2]]) === 3);
console.log(countComponents(1, []) === 1);
