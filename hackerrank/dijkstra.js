// https://www.hackerrank.com/challenges/dijkstrashortreach/problem?h_r=internal-search

function insertValue(queue, node, map) {
  let indexOfElementWithBiggerDistance;

  for (let i = 0; i< queue.length; i++) {
    if (node.shortestPath < map[queue[i]].shortestPath) {
      indexOfElementWithBiggerDistance = i;
      break;
    }
  }

  if (indexOfElementWithBiggerDistance !== undefined) {
    queue.splice(indexOfElementWithBiggerDistance, 0, node.index);
  } else {
    queue.push(node.index);
  }
}

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
  // We will store all nodes to visit in the sorted queue by distance
  // But here should be the real heap implementation
  const heap = [start];
  // Set 0 path to the start node
  map[start].shortestPath = 0;
  map[start].visited = true;

  while (heap.length) {
    // Get the minimum node from the heap
    const node = map[heap.shift()];

    for (let edge of node.edges) {
      // Get the destination node of each of the edges and put it to the heap if it hasn't been visited
      const end = map[edge.node];

      // Check whether we got to the destination node faster than before
      if (end.shortestPath === -1 || end.shortestPath > node.shortestPath + edge.distance) {
        end.shortestPath = node.shortestPath + edge.distance;
      }

      if (end && !end.visited) {
        // Put the value in the heap
        insertValue(heap, end, map);
        // Set visited to not duplicate visits
        end.visited = true;
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

const sampleEdges = [
  [1, 2, 24],
  [1, 4, 20],
  [3, 1, 3],
  [4, 3, 12],
];

console.log(shortestReach(4, sampleEdges, 1)); // expected [24 3 15]

const sampleEdges1 = [
  [1, 2, 5],
  [2, 3, 6],
  [3, 4, 2],
  [1, 3, 15],
];

console.log(shortestReach(5, sampleEdges1, 1)); // expected [5 11 13 -1]

const sampleEdges2 = [
  [1, 5, 100],
  [1, 6, 1],
  [5, 3, 96],
  [4, 6, 1],
  [4, 3, 1],
  [2, 3, 100],
];

console.log(shortestReach(6, sampleEdges2, 1)); // expected [103, 3, 2, 99, 1]

const sampleEdges3 = [
  [1 ,7 ,45],
  [2 ,14 ,15],
  [3 ,7 ,29],
  [4 ,1 ,48],
  [5 ,1 ,66],
  [6 ,7 ,17],
  [7 ,14 ,15],
  [8 ,14 ,43],
  [9 ,1 ,27],
  [10 ,1 ,33],
  [11 ,14 ,64],
  [12, 14, 27],
  [13, 7, 66],
  [14, 7, 54],
  [15, 14, 56],
  [16, 7, 21],
  [17, 1, 20],
  [18, 1, 34],
  [19, 7, 52],
  [20, 14, 14],
  [9, 14, 9],
  [15, 1, 39],
  [12, 1, 24],
  [9, 1, 16],
  [1, 2, 33],
  [18, 1, 46],
  [9, 1, 28],
  [15, 14, 3],
  [12, 1, 27],
  [1, 2, 5],
  [15, 1, 34],
  [1, 2, 28],
  [9, 7, 16],
  [3, 7, 23],
  [9, 7, 21],
  [9, 14, 19],
  [3, 1, 20],
  [3, 1, 5],
  [12, 14, 19],
  [3, 14, 2],
  [12, 1, 46],
  [3, 14, 5],
  [9, 14, 44],
  [6, 14, 26],
  [9, 14, 16],
  [9, 14, 34],
  [6, 7, 42],
  [3, 14, 27],
  [1, 7, 9],
  [1, 7, 41],
  [15, 14, 19],
  [12, 7, 13],
  [3, 7, 10],
  [1, 7, 2],
];

console.log(shortestReach(20, sampleEdges3, 17));
// expected [20 25 25 68 86 39 22 70 36 53 91 35 88 27 30 43 54 74 41]

