namespace BPlusTree {

    interface Node {
        isLeaf?: boolean;
        parent?: Node;
        children: { key: number, value?: number, node?: Node }[];
    }

    export class BPTree {
        branching: number;
        root: Node;

        public find(key: number): number {
            let leaf = this.findLeaf(key, this.root);
            let keyIndex = this.getKeyIndex(key, leaf);
            if (keyIndex.found) {
                return leaf.children[keyIndex.index].value;
            }

            return null;
        }

        public insert(key: number, value: number) {
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

        private split(node: Node) {
            let halfIndex = Math.floor(node.children.length / 2);

            let extraKey = node.children[halfIndex].key;
            let extraChildren = node.children.splice(halfIndex, node.children.length - halfIndex);
            if (!node.isLeaf) {
                extraChildren.splice(0, 1);
            }

            let extraNode: Node = { isLeaf: node.isLeaf, parent: node.parent, children: extraChildren };

            let parent = node.parent;
            if (parent) {
                let keyIndex = this.getKeyIndex(extraKey, parent).index;
                parent.children.splice(keyIndex, 0, { key: extraKey, node: extraNode });

                if (parent.children.length > this.branching) {
                    this.split(parent);
                }
            } else {
                this.root = {
                    children: [
                        { key: extraKey, node: node },
                        { key: Infinity, node: extraNode }]
                };
            }
        }

        private findLeaf(key: number, node: Node): Node {
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

        private getKeyIndex(key: number, node: Node): { index: number, found: boolean } {
            for (let i = 0; i < node.children.length; i++) {
                let child = node.children[i];
                if (child.key == key) {
                    return { index: i, found: true };
                } else if (child.key < key) {
                    return { index: i, found: false };
                }
            }

            return { index: node.children.length, found: false };
        }
    }

}

