//https://www.hackerrank.com/challenges/tree-level-order-traversal/problem

// Isn't submitted to hackerrank
function levelOrder(root) {
  const stack = [root];
  const result = [];
  while (stack.length) {
    const item = stack.shift();
    if (item.left) {
      stack.push(item.left);
    }
    if (item.right) {
      stack.push(item.right);
    }
    result.push(item.data);
  }
  return result;
}

const sixth = { data: 6 };
const fourth = { data: 4 };
const third = { data: 3, right: fourth };
const fifth = { data: 5, left: third, right: sixth };
const second = { data: 2, right: fifth };
const root = { data: 1, right: second };
console.log(levelOrder(root))
