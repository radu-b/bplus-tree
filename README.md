# bplus-tree

A simple B+ tree implementation in Typescript.

Keys are numbers, value type can be specified.

## Usage
```
  let tree = new BPlusTree<string>(3);

  tree.insert(9, "nine");
  tree.insert(8, "eight");
  tree.insert(3, "three");
        
  let value = tree.find(3);
  
  tree.print();
```
