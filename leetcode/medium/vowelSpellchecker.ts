// https://leetcode.com/problems/vowel-spellchecker/

// @ts-nocheck
type Node = {
  val: string;
  children: { [key: string]: Node };
  parent: Node | null;
  index: number;
};

const vowels = ['a', 'e', 'i', 'o', 'u'];

function insertWord(word: string, root: Node, index: number): void {
  if (!word.length) return;

  const val = word.substring(0, 1);

  if (!root.children[val]) {
    root.children[val] = {
      val,
      children: {},
      parent: root,
      index,
    }
  }
  insertWord(word.substring(1), root.children[val], index);
}

function buildTrie(wordlist: string[]): Node {
  const root: Node = {
    val: '',
    children: {},
    parent: null,
    index: -1,
  };

  for (let i = 0; i < wordlist.length; i++) {
    insertWord(wordlist[i], root, i);
  }

  return root;
}

function findExactWord(query: string, trie: Node): string {
  const val = query.substring(0, 1);
  if (trie.children[val]) {
    if (query.length === 1) return val;
    const word = findExactWord(query.substring(1), trie.children[val]);
    if (word) return val + word;
  }
  return '';
}

function findWord(query: string, trie: Node): string {
  const val = query.substring(0, 1);
  let word = '';
  if (trie.children[val.toLowerCase()] && (!trie.children[val.toUpperCase()] || trie.children[val.toLowerCase()].index < trie.children[val.toUpperCase()].index)) {
    if (query.length === 1) return val.toLowerCase();
    word = findWord(query.substring(1), trie.children[val.toLowerCase()]);
    if (word) return val.toLowerCase() + word;
  }

  if (trie.children[val.toUpperCase()] && (!trie.children[val.toLowerCase()] ||  trie.children[val.toLowerCase()].index > trie.children[val.toUpperCase()].index)) {
    if (query.length === 1) return val.toUpperCase();
    word = findWord(query.substring(1), trie.children[val.toUpperCase()]);
    if (word) return val.toUpperCase() + word;
  }

  if (vowels.includes(val.toLowerCase())) {
    const possibleVowels = Object.values(trie.children).filter(node => vowels.includes(node.val)).sort((a, b) => a.index - b.index);
    for (let node of possibleVowels) {
      let vowel = node.val;
      if (trie.children[vowel]) {
        if (query.length === 1) return vowel;
        word = findWord(query.substring(1), trie.children[vowel]);
        if (word) return vowel + word;
      }
    }
  }
  return '';
}

function spellchecker(wordlist: string[], queries: string[]): string[] {
  const trie: Node = buildTrie(wordlist);
  const answer = [];

  for (let query of queries) {
    let word = findExactWord(query, trie);
    if (word) {
      answer.push(word);
      continue;
    }
    word = findWord(query, trie);
    answer.push(word);
  }
  return answer;
};
