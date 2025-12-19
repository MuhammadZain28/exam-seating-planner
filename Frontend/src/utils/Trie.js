class TrieNode {
  constructor() {
    this.children = {};      // hash table
    this.isEnd = false;
    this.student = null;    // store student object
  }
}

export default class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(name, student) {
    let node = this.root;
    for (let ch of name.toLowerCase()) {
      if (!node.children[ch]) {
        node.children[ch] = new TrieNode();
      }
      node = node.children[ch];
    }
    node.isEnd = true;
    node.student = student;
  }

  search(prefix) {
    let node = this.root;
    for (let ch of prefix.toLowerCase()) {
      if (!node.children[ch]) return [];
      node = node.children[ch];
    }
    return this._collect(node);
  }

  _collect(node, results = []) {
    if (node.isEnd) results.push(node.student);
    for (let ch in node.children) {
      this._collect(node.children[ch], results);
    }
    return results;
  }
}