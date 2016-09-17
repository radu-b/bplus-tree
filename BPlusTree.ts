namespace BPlus {

    interface Node<V> {
        isLeaf?: boolean;
        parent?: Node<V>;
        children: NodeChild<V>[];
    }

    interface NodeChild<V> {
        key: number;
        value?: V;
        node?: Node<V>;
    }

    export class BPlusTree<V> {
        branching: number;
        root: Node<V>;

        public constructor(branching: number) {
            this.branching = branching;
            this.root = { isLeaf: true, children: [] };
        }

        public find(key: number): V {
            let leaf = this.findLeaf(key, this.root);
            let keyIndex = this.getKeyIndex(key, leaf);
            if (keyIndex.found) {
                return leaf.children[keyIndex.index].value;
            }

            return null;
        }

        public insert(key: number, value: V) {
            let leaf = this.findLeaf(key, this.root);
            let keyIndex = this.getKeyIndex(key, leaf);
            if (keyIndex.found) {
                return;
            }

            leaf.children.splice(keyIndex.index, 0, { key, value });

            if (leaf.children.length > this.branching - 1) {
                this.split(leaf);
            }
        }

        private split(node: Node<V>) {
            let middleIndex = Math.floor((node.children.length - (node.isLeaf ? 0 : 1)) / 2);
            let middleKey = node.children[middleIndex].key;
            
            let newNode: Node<V> = {
                isLeaf: node.isLeaf,
                parent: node.parent,
                children: node.children.splice(middleIndex, node.children.length - middleIndex)
            };

            if (!node.isLeaf) {
                let middleNode = newNode.children.splice(0, 1)[0].node;
                node.children.push({ key: Infinity, node: middleNode });

                for (let child of newNode.children) {
                    child.node.parent = newNode;
                }
            }

            let parent = node.parent;
            if (parent) {
                let keyIndex = this.getKeyIndex(middleKey, parent).index;
                parent.children.splice(keyIndex, 0, { key: middleKey, node: node });
                parent.children[keyIndex + 1].node = newNode;

                if (parent.children.length > this.branching) {
                    this.split(parent);
                }
            } else {
                this.root = {
                    children: [
                        { key: middleKey, node: node },
                        { key: Infinity, node: newNode }]
                };

                node.parent = this.root;
                newNode.parent = this.root;
            }
        }

        private findLeaf(key: number, node: Node<V>): Node<V> {
            if (node.isLeaf) {
                return node;
            } else {
                for (let child of node.children) {
                    if (key < child.key) {
                        return this.findLeaf(key, child.node);
                    }
                }
            }
        }

        private getKeyIndex(key: number, node: Node<V>): { index: number, found: boolean } {
            for (let i = 0; i < node.children.length; i++) {
                let child = node.children[i];
                if (key == child.key) {
                    return { index: i, found: true };
                } else if (key < child.key) {
                    return { index: i, found: false };
                }
            }

            return { index: node.children.length, found: false };
        }

        public print() {
            this.printNode({ key: 0, node: this.root }, "", true, false, true);
        }

        private printNode(nodeItem: NodeChild<V>, prefix: string, isLast: boolean, isLeaf: boolean, isRoot: boolean) {
            if (!isRoot) {
                let valueString = isLeaf ? ` [${nodeItem.value}]` : "";
                console.log(prefix + (isLast ? "└── " : "├── ") + nodeItem.key + valueString);
            }
            if (!isLeaf) {
                let node = nodeItem.node;
                for (let i = 0; i < node.children.length; i++) {
                    let isLastChild = (i == node.children.length - 1);
                    this.printNode(node.children[i], prefix + (isLast ? "    " : "│   "), isLastChild, node.isLeaf, false);
                }
            }
        }
    }

}

