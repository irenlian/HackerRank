// https://www.hackerrank.com/challenges/swap-nodes-algo/problem

function buildTree(indexes, i) {
  if (i === -2) {
    return null;
  }

  return {
    data: i + 1,
    left: buildTree(indexes, indexes[i][0] - 1),
    right: buildTree(indexes, indexes[i][1] - 1),
  };
}

function swap(tree, k, level) {
  // swap the left and right nodes if the level is 1k, 2k, 3k or so on
  if (level % k === 0) {
    [tree.left, tree.right] = [tree.right, tree.left];
  }

  // initialize a future output
  let inOrder = [];

  // add to future output left side at first
  if (tree.left) {
    inOrder = swap(tree.left, k, level + 1);
  }

  // than the root
  inOrder.push(tree.data);

  // and right side afterwards
  if (tree.right) {
    inOrder = [...inOrder, ...swap(tree.right, k, level + 1)];
  }
  return inOrder;
}

function swapNodes(indexes, queries) {
  const tree = buildTree(indexes, 0);
  const inOrder = [];
  for (let k of queries) {
    inOrder.push(swap(tree, k, 1));
  }
  return inOrder;
}

const sampleIndexes = [[2,3], [-1,-1], [-1,-1]];
const sampleQueries = [1, 1];
console.log(swapNodes(sampleIndexes, sampleQueries));

const sampleIndexes1 = [[2,3], [-1,4], [-1,5], [-1,-1], [-1,-1]];
const sampleQueries1 = [2];
console.log(swapNodes(sampleIndexes1, sampleQueries1));

const sampleIndexes2 = [[2,3], [4,-1], [5,-1], [6,-1], [7,8], [-1,9], [-1,-1], [10,11], [-1,-1], [-1,-1], [-1,-1]];
const sampleQueries2 = [2, 4];
console.log(swapNodes(sampleIndexes2, sampleQueries2));

const sampleIndexes3 = [[-1,-1]];
const sampleQueries3 = [1];
console.log(swapNodes(sampleIndexes3, sampleQueries3));
