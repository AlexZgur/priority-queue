const Node = require('./node');

class MaxHeap {
    constructor() {
        this.clear();
    }

    push(data, priority) {
        let node = new Node(data, priority);
        this.insertNode(node);
        this.shiftNodeUp(node);
    }

    pop() {
        if (!this.isEmpty()) {
            let rootNode = this.detachRoot();
            if (this.parentNodes.length > 0) {
                this.restoreRootFromLastInsertedNode(rootNode);
                this.shiftNodeDown(this.root);
            }
            this.nodeCount--;
            return rootNode.data;
        }
    }

    detachRoot() {
        let rootNode = this.root;
        this.root = null;
        if (this.parentNodes[0] == rootNode) {
            this.parentNodes.shift();
        }
        return rootNode;
    }

    restoreRootFromLastInsertedNode(detached) {
        if (!this.isEmpty()) {
            let lastNode = this.parentNodes.pop();
            let lastNodeParent = lastNode.parent;

            if (lastNodeParent) {
                lastNodeParent.removeChild(lastNode);
                if (lastNodeParent !== detached && !lastNodeParent.right && this.parentNodes.indexOf(lastNodeParent) < 0) {
                    this.parentNodes.unshift(lastNodeParent);
                }
            }
            lastNode.parent = null;
            lastNode.left = detached.left;
            if (lastNode.left) lastNode.left.parent = lastNode;

            lastNode.right = detached.right;
            if (lastNode.right) lastNode.right.parent = lastNode;

            if ((!lastNode.left || !lastNode.right)) {
                this.parentNodes.unshift(lastNode);
            }

            this.root = lastNode;
        }
    }

    size() {
        return this.nodeCount;
    }

    isEmpty() {
        return this.size() == 0;
    }

    clear() {
        this.root = null;
        this.parentNodes = [];
        this.nodeCount = 0;
    }

    insertNode(node) {
        this.parentNodes.push(node);
        if (this.isEmpty()) {
            this.root = node;
        } else {
            this.parentNodes[0].appendChild(node);
            if (node === this.parentNodes[0].right) {
                this.parentNodes.shift();
            }
        }
        this.nodeCount++;
    }

    shiftNodeUp(node) {
        let parent = node.parent;
        if (parent) {
            if (node.priority > node.parent.priority) {
                let index = this.parentNodes.indexOf(node);
                let indexParent = this.parentNodes.indexOf(parent);
                node.swapWithParent();
                if (index >= 0) this.parentNodes[index] = parent;
                if (indexParent >= 0) this.parentNodes[indexParent] = node;
                this.shiftNodeUp(node);
            }
        } else {
            this.root = node;
        }
    }

    shiftNodeDown(node) {
        if (node.left || node.right) {
            let swapCandidat = null;
            if (node.right && node.right.priority > node.left.priority) {
                swapCandidat = node.right;
            } else {
                swapCandidat = node.left;
            }
            if (swapCandidat.priority > node.priority) {
                let index = this.parentNodes.indexOf(node);
                let indexChild = this.parentNodes.indexOf(swapCandidat);
                swapCandidat.swapWithParent();
                if (index >= 0) {
                    this.parentNodes[index] = swapCandidat;
                }
                if (indexChild >= 0) {
                    this.parentNodes[indexChild] = node;
                }
                if (this.root === node) {
                    this.root = swapCandidat;
                }
                this.shiftNodeDown(node);
            }
        }
    }
}

module.exports = MaxHeap;