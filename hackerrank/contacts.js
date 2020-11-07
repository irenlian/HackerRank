// https://www.hackerrank.com/challenges/contacts/problem

/**
 * type Node {
 *   children: HashMap;
 *   count: Number;
 * }
 */

function add(contacts, newContact) {
  let currentNode = contacts;
  for (let i = 0; i < newContact.length; i++) {
    currentNode.count++;
    if (!currentNode.children[newContact[i]]) {
      currentNode.children[newContact[i]] = {
        children: {},
        count: 0,
      };
    }
    currentNode = currentNode.children[newContact[i]];
  }
  currentNode.count++;
}

function find(contacts, partial) {
  let currentNode = contacts;
  for (let i = 0; i < partial.length; i++) {
    if (currentNode.children[partial[i]]) {
      currentNode = currentNode.children[partial[i]];
    } else {
      return 0;
    }
  }
  if (currentNode) {
    return currentNode.count;
  }
  return 0;
}

function contacts(queries) {
  const contacts = {
    children: {},
    count: 0,
  }
  const results = [];

  for (let [query, str] of queries) {
    if (query === 'add') {
      add(contacts, str);
    }
    if (query === 'find') {
      results.push(find(contacts, str));
    }
  }

  return results;
}

const sample = [
  ['add', 'hack'],
  ['add', 'hackerrank'],
  ['find', 'hac'],
  ['find', 'hak'],
  ['find', 'hackerrank'],
  ['find', ''],
  ['find', 'a'],
  ['add', 'add'],
  ['find', 'a'],
];
const sample1 = [
  ['add', 's'],
  ['add', 'ss'],
  ['add', 'sss'],
  ['add', 'ssss'],
  ['add', 'sssss'],
  ['find', 's'],
  ['find', 'ss'],
  ['find', 'sss'],
  ['find', 'ssss'],
  ['find', 'sssss'],
  ['find', 'ssssss'],
];
console.log(contacts(sample));
