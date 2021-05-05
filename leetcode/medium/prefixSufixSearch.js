// type SearchType = {
//   index;
//   suffixLeft;
// }

class WordFilter {
  map;

  constructor(words) {
    this.map = {};
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      let node = this.map;
      for (let j = 0; j < word.length; j++) {
        if (!node[word[j]]) {
          node[word[j]] = {};
        }
        node = node[word[j]];
      }
      node['word'] = i;
    }
  }

  searchForSuffix(node, suffix) {
    let result = [];

    for (let key in node) {
      if (key === 'word') {
        result.push({ index: node[key], suffixLeft: suffix });
        continue;
      }
      const innerResults = this.searchForSuffix(node[key], suffix);
      for (let r of innerResults) {
        const { index, suffixLeft } = r;
        if (!suffixLeft.length || suffixLeft[suffixLeft.length - 1] === key) {
          result.push({ index, suffixLeft: suffixLeft.slice(0, suffixLeft.length - 1)});
        }
      }
    }
    return result;
  }

  f(prefix, suffix) {
    let node = this.map;
    for (let i = 0; i < prefix.length; i++) {
      if (!node[prefix[i]]) return -1;
      node = node[prefix[i]];
    }
    let result = this.searchForSuffix(node, suffix);
    let max = -1;
    for (let i = 0; i < result.length; i++) {
      if (result[i].suffixLeft.length && !prefix.endsWith(result[i].suffixLeft)) continue;
      max = Math.max(max, result[i].index);
    }
    return max;
  }
}

/**
 * Your WordFilter object will be instantiated and called as such:
 * var obj = new WordFilter(words)
 * var param_1 = obj.f(prefix,suffix)
 */

const obj = new WordFilter(["applel","algfle"]);
const param_1 = obj.f('a', 'l');
console.log(param_1);
