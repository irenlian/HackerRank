// https://leetcode.com/problems/convert-bst-to-greater-tree/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

const convert = (root, parentVal = 0) => {
  if (!root) return 0;
  let rightVal = 0;
  if (root.right) {
    rightVal = convert(root.right, parentVal);
    root.val += rightVal;
  } else {
    root.val += parentVal;
  }
  const leftVal = convert(root.left, root.val);
  if (root.left) return leftVal;
  return root.val;
}

// Complexity O(n), space complexity - O(1)
function convertBST(root) {
  convert(root);
  return root;
};

// example
// console.log(convertBST([[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]]))
// should return [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]
