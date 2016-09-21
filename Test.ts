namespace BPlus {

    export function main() {
        let tree = new BPlusTree<number, string>(3);

        tree.add(9, "nine");
        tree.add(8, "eight");
        tree.add(3, "three");
        tree.add(2, "two");
        tree.add(1, "one");
        tree.add(7, "seven");
        tree.add(6, "six");
        tree.add(5, "five");
        tree.add(4, "four");

        for (let i = 1; i < 10; i++) {
            console.log(tree.find(i));
        }

        console.log(tree.find(100));

        tree.print();

        return;
    }
}

BPlus.main();