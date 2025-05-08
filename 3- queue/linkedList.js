class LinkedListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
class LinkedListIterator {
    constructor(node) {
        this.currentNode = node;
    }
    data() {
        if (!this.currentNode)
            throw new Error("No node to show its data");
        return this.currentNode.data;
    }
    next() {
        if (!this.currentNode)
            return;
        this.currentNode = this.currentNode.next;
    }
    current() {
        return this.currentNode;
    }
}
export class LinkedList {
    constructor(unique) {
        this.count = 0;
        this.head = null;
        this.tail = null;
        this.unique = unique !== null && unique !== void 0 ? unique : false;
    }
    insertFirst(data) {
        if (this.isThere(data))
            return;
        const newNode = new LinkedListNode(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.count++;
    }
    deleteHead() {
        if (!this.head)
            return;
        this.head = this.head.next;
        this.count--;
    }
    insertLast(data) {
        if (this.isThere(data))
            return;
        const newNode = new LinkedListNode(data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            if (this.tail)
                this.tail.next = newNode;
            this.tail = newNode;
        }
        this.count++;
    }
    insertAfter(searchData, data) {
        if (!this.head)
            return;
        if (this.isThere(data))
            return;
        let node = this.find(searchData);
        if (!node)
            return;
        let newNode = new LinkedListNode(data);
        if (node === this.tail) {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        else {
            newNode.next = node.next;
            node.next = newNode;
        }
        this.count++;
    }
    insertBefore(searchData, data) {
        if (!this.head)
            return;
        if (this.isThere(data))
            return;
        let node = this.find(searchData);
        if (!node)
            return;
        let newNode = new LinkedListNode(data);
        newNode.next = node;
        if (node === this.head) {
            this.head = newNode;
        }
        else {
            let parent = this.findParent(node);
            if (!parent)
                return;
            parent.next = newNode;
        }
        this.count++;
    }
    deleteNode(data) {
        let node = this.find(data);
        if (!node)
            return;
        if (this.count === 1) {
            this.head = null;
            this.tail = null;
        }
        else if (node === this.head) {
            this.head = this.head.next;
        }
        else {
            let parent = this.findParent(node);
            if (!parent)
                return;
            parent.next = node.next; // always update the parent
            if (node === this.tail) {
                parent.next = null;
                this.tail = parent;
            }
        }
        this.count--;
    }
    findParent(node) {
        for (let itr = this.begin(); itr.current() !== null; itr.next()) {
            if (itr.current().next === node) {
                return itr.current();
            }
        }
        return null;
    }
    find(data) {
        if (this.count === 0)
            return null;
        for (let itr = this.begin(); itr.current() !== null; itr.next()) {
            if (itr.data() === data) {
                return itr.current();
            }
        }
        return null;
    }
    isThere(data) {
        return this.unique && this.find(data) ? true : false;
    }
    begin() {
        if (!this.head)
            throw new Error("No items in the list");
        const itr = new LinkedListIterator(this.head);
        return itr;
    }
    printList() {
        if (!this.head) {
            console.log("No items in the list, start by adding some :)");
            return;
        }
        let str = "";
        for (let itr = this.begin(); itr.current() !== null; itr.next()) {
            str += itr.data() + " -> ";
        }
        return str;
    }
}
