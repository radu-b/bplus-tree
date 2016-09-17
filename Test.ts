namespace BPlus {

    export function main() {
        let tree = new BPlusTree<string>(3);

        tree.insert(9, "nine");
        tree.insert(8, "eight");
        tree.insert(3, "three");
        tree.insert(2, "two");
        tree.insert(1, "one");
        tree.insert(7, "seven");
        tree.insert(6, "six");
        tree.insert(5, "five");
        tree.insert(4, "four");

        for (let i = 1; i < 10; i++) {
           console.log(tree.find(i));
        }

        console.log(tree.find(100));
        
        tree.print();

        return;
    }
}

BPlus.main();