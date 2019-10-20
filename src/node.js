class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.parent = null;
        this.left = null;
        this.right = null;
    }

    appendChild(node) {
        if (node) {
            if (!this.left) {
                this.left = node;
                node.parent = this;
            } else if (!this.right) {
                this.right = node;
                node.parent = this;
            }
        }
    }

    removeChild(node) {
        if (node) {
            if (this.left === node) {
                this.left = null;
                node.parent = null;
            } else if (this.right === node) {
                this.right = null;
                node.parent = null;
            } else {
                throw new Error("This is not a child");
            }
        }
    }

    remove() {
        if (this.parent) {
            this.parent.removeChild(this);
            //this.parent = null;
        }
    }

    swapWithParent() {
        if (this.parent) {
            let parentNode = this.parent;
            let grandNode = parentNode.parent;
            let leftNode = this.left;
            let rightNode = this.right;
            let parentLeftNode = parentNode.left;
            let parentRightNode = parentNode.right;

            if (rightNode) rightNode.remove();
            if (leftNode) leftNode.remove();
            if (parentLeftNode) parentLeftNode.remove();
            if (parentRightNode) parentRightNode.remove();

            if (grandNode) {
                parentNode.remove();
                grandNode.appendChild(this);
            } else {
                this.parent = null;
            }

            parentNode.appendChild(leftNode);
            parentNode.appendChild(rightNode);
            if (this === parentLeftNode) {
                this.appendChild(parentNode);
                this.appendChild(parentRightNode);
            } else {
                this.appendChild(parentLeftNode);
                this.appendChild(parentNode);
            }
        }
    }
}

module.exports = Node;