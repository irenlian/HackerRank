// https://leetcode.com/problems/inorder-successor-in-bst/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left
 *     right
 *     constructor(val?: number, left?, right?) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function findMin(root) {
  if (!root) return null;
  return findMin(root.left) || root;
};

function findPoint(root, p, successor) {
  if (!root || !p) return null;
  if (root.val === p.val) return findMin(p.right);
  // We found the point. It is the left leave
  // Return the right child of the leave or root
  if (root.left && p.val === root.left.val) {
    return findMin(p.right) || root;
  }
  if (root.right && p.val === root.right.val) {
    if (p.right) {
      return findMin(p.right);
    }
    return successor && successor.val > p.val ? successor : null;
  }
  if (p.val < root.val) {
    return findPoint(root.left, p, root);
  }
  return findPoint(root.right, p, successor);
};

// Time complexity is O(n)
// The further optimization - remove recursion
function inorderSuccessor(root, p) {
  if (!root || !p) return null;
  return findPoint(root, p, root);
};

// Here should be the real binary tree converted from this array (try in Leetcode)
const tree = [10,6,20,4,8,14,null,null,5,7,9,null,15,null,null,null,null];

const tests = [
  { parameters: [tree, 4], correctAnswer: 5 },
  { parameters: [tree, 5], correctAnswer: 6 },
  { parameters: [tree, 6], correctAnswer: 7 },
  { parameters: [tree, 7], correctAnswer: 8 },
  { parameters: [tree, 8], correctAnswer: 9 },
  { parameters: [tree, 9], correctAnswer: 10 },
  { parameters: [tree, 10], correctAnswer: 14 },
  { parameters: [tree, 14], correctAnswer: 15 },
  { parameters: [tree, 15], correctAnswer: 20 },
  { parameters: [tree, 20], correctAnswer: null },
];

tests.forEach((test) => {
  console.log(inorderSuccessor(...test.parameters) === test.correctAnswer);
});
