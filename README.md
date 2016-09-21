# bplus-tree

A simple B+ tree implementation in Typescript, with configurable branching factor.

Key and value types can be specified - they are generic type parameters.
Within a node, the key search is done with binary search, so it's fast for large branching factors.

## Usage
```Typescript
  let tree = new BPlusTree<number, string>(3);

  tree.add(1, "Mary");
  tree.add(2, "John");
  tree.add(3, "Jane");
  tree.add(4, "George");
        
  let john = tree.find(2);
  
  tree.print();
```

The constructor optionally accepts a comparator function, that receives two parameters of the type of the key, and should return:
* a negative number, if the first parameter is smaller than the second
* zero, if the elements are equal
* a positive number, if the first parameter is larger

```Typescript
  let tree = new BPlusTree<Date, string>(20, (a, b) => a.getTime() - b.getTime());
```