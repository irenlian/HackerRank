// https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val
 *     next | null
 *     constructor(val?, next? | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

/*
 * Definition for a binary tree node.
 */
class TreeNode {
    val
    left
    right
    constructor(val, left, right) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function getNode(left, right, current) {
  if (left > right) return null;
  const middle = Math.round((right + left) / 2);
  const leftNode = getNode(left, middle - 1, current);
  const root = new TreeNode(current.node.val);
  current.node = current.node.next;
  const rightNode = getNode(middle + 1, right, current);
  root.left = leftNode;
  root.right = rightNode;
  return root;
}

function sortedListToBST(head) {
  let size = 0;
  let temp = head;
  while (temp) {
    temp = temp.next;
    size++;
  }
  if (!head) return null;
  const current = { node: head };
  const root = getNode(0, size - 1, current);
  return root;
};

const input = [-10,-3,0,5,9];
const head = { val: -10, next: { val: -3, next: { val: 0, next: { val: 5, next: { val: 9, next: null }}}} };
console.log(sortedListToBST(head));
