// https://www.hackerrank.com/challenges/dijkstrashortreach/problem?h_r=internal-search

/**
 * type Node = {
 *   edges: Array({ node: number; distance: number });
 *   visited: boolean;
 *   shortestPath: number;
 *   index: number;
 * }
 */

function prepareMap(edges) {
  const map = {};

  for (let edge of edges) {
    // Create the starting node
    if (!map[edge[0]]) {
      map[edge[0]] = {
        edges: [],
        visited: false,
        shortestPath: -1,
        index: edge[0],
      };
    }
    // Create the ending node
    if (!map[edge[1]]) {
      map[edge[1]] = {
        edges: [],
        visited: false,
        shortestPath: -1,
        index: edge[1],
      };
    }
    // Adding the edge to the both nodes
    map[edge[0]].edges.push({
      node: edge[1],
      distance: edge[2],
    });
    map[edge[1]].edges.push({
      node: edge[0],
      distance: edge[2],
    });
  }

  return map;
}

function calculatePath(map, start) {
  // We will store all nodes to visit in the queue
  const queue = [start];
  // Set 0 path to the start node
  map[start].shortestPath = 0;
  map[start].visited = true;

  while (queue.length) {
    // Get the first node in the queue
    const node = map[queue.shift()];
    // // Set visited to not duplicate visits
    // node.visited = true;

    for (let edge of node.edges) {
      // Get the destination node of each of the edges and put it to the queue if it hasn't been visited
      const end = map[edge.node];

      if (end && !end.visited) {
        queue.push(edge.node);
        // Set visited to not duplicate visits
        end.visited = true;
      }

      // Check whether we got to the destination node faster than before
      if (end.shortestPath === -1 || end.shortestPath > node.shortestPath + edge.distance) {
        end.shortestPath = node.shortestPath + edge.distance;
      }
    }
  }
}

function getPathsToEachNode(map, start, n) {
  const paths = [];
  for (let i = 1; i <= n; i++) {
    if (i !== start) {
      paths.push(map[i] ? map[i].shortestPath : -1);
    }
  }
  return paths;
}

/**
 * Output the array of the shortest path lengths for each of the nodes consequently by its index
 *
 * @param n - number of nodes
 * @param edges - array of edges between nodes,
 * each element is [index of start node, index of end node, path length between these two nodes]
 * @param s - index of the start node, from which we need to calculate path
 */
function shortestReach(n, edges, s) {
  // Create the map to group edges by start value and store the shortest path
  const map = prepareMap(edges);
  // Calculate the shortest path to each of the nodes
  calculatePath(map, s);
  // Return an array of paths that correspond to nodes
  return getPathsToEachNode(map, s, n);
}

// const sampleEdges = [
//   [1, 2, 24],
//   [1, 4, 20],
//   [3, 1, 3],
//   [4, 3, 12],
// ];
//
// console.log(shortestReach(4, sampleEdges, 1)); // expected [24 3 15]
//
// const sampleEdges1 = [
//   [1, 2, 5],
//   [2, 3, 6],
//   [3, 4, 2],
//   [1, 3, 15],
// ];
//
// console.log(shortestReach(5, sampleEdges1, 1)); // expected [5 11 13 -1]
//
// const sampleEdges2 = [
//   [1, 2, 2],
//   [3, 2, 2],
//   [3, 4, 5],
//   [4, 5, 2],
//   [6, 5, 3],
//   [6, 3, 3],
// ];
//
// console.log(shortestReach(6, sampleEdges2, 1)); // expected

const sampleEdges3 = [
  [1, 3, 3],
  [1, 2, 2],
  [2, 5, 5],
  [6, 7, 4],
  [4, 1, 5],
  [4, 5, 1],
  [7, 5, 3],
  [6, 3, 3],
];

console.log(shortestReach(7, sampleEdges3, 1)); // expected [2, 3, 4, 6, 6, 9]
