const MaxHeap = require('./max-heap.js');

class PriorityQueue {
    constructor(maxSize = 30) {
        this.maxSize = maxSize;
        this.heap = new MaxHeap();
    }

    push(data, priority) {
        if (this.size() == this.maxSize) {
            throw new Error('Heap max size is reached!');
        } else {
            this.heap.push(data, priority);
        }
    }

    shift() {
        if (!this.isEmpty()) {
            return this.heap.pop();
        } else {
            throw new Error('Queue is empty!');
        }
    }

    size() {
        return this.heap.size();
    }

    isEmpty() {
        return this.heap.isEmpty();
    }
}

module.exports = PriorityQueue;