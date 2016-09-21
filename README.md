# bplus-tree

A simple B+ tree implementation in Typescript.

Key and value types can be specified - they are generic type parameters.
Within a node, the search is done using binary search.

## Usage
```
  let tree = new BPlusTree<number, string>(3);

  tree.add(1, "Mary");
  tree.add(2, "John");
  tree.add(3, "Jane");
        
  let value = tree.find(3);
  
  tree.print();
```

The constructor optionally accepts a comparator function, that receives two parameters of the type of the key, and should return:
* a negative number, if the first parameter is smaller than the second
* zero, if the elements are equal
* a positive number, if the first parameter is larger

```
  let tree = new BPlusTree<Date, string>(20, (a, b) => a.getTime() - b.getTime());
```