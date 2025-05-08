var DoublyLinkedNode = /** @class */ (function () {
    function DoublyLinkedNode(data) {
        this.data = data;
        this.back = null;
        this.next = null;
    }
    return DoublyLinkedNode;
}());
var DoublyLinkedIterator = /** @class */ (function () {
    function DoublyLinkedIterator(node) {
        this.currentNode = node;
    }
    DoublyLinkedIterator.prototype.data = function () {
        if (!this.currentNode)
            return;
        return this.currentNode.data;
    };
    DoublyLinkedIterator.prototype.next = function () {
        if (!this.currentNode)
            return;
        this.currentNode = this.currentNode.next;
    };
    DoublyLinkedIterator.prototype.back = function () {
        if (!this.currentNode)
            return;
        this.currentNode = this.currentNode.back;
    };
    DoublyLinkedIterator.prototype.current = function () {
        return this.currentNode;
    };
    return DoublyLinkedIterator;
}());
var DoublyLinkedList = /** @class */ (function () {
    function DoublyLinkedList() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }
    DoublyLinkedList.prototype.insertLast = function (data) {
        if (!data)
            return;
        var newNode = new DoublyLinkedNode(data);
        if (this.head === null || this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.back = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    };
    DoublyLinkedList.prototype.insertAfter = function (afterData, data) {
        var node = this.find(afterData);
        if (!node)
            return;
        var newNode = new DoublyLinkedNode(data);
        newNode.back = node;
        newNode.next = node.next;
        node.next = newNode;
        if (newNode.next === null) {
            this.tail = newNode;
        }
        else {
            newNode.next.back = newNode;
        }
        this.length++;
    };
    DoublyLinkedList.prototype.insertBefore = function (beforeData, data) {
        var node = this.find(beforeData);
        if (!node)
            return;
        var newNode = new DoublyLinkedNode(data);
        newNode.next = node;
        newNode.back = node.back;
        node.back = newNode;
        if (newNode.back === null) {
            this.head = newNode;
        }
        else {
            newNode.back.next = newNode;
        }
        this.length++;
    };
    DoublyLinkedList.prototype.deleteNode = function (data) {
        var node = this.find(data);
        if (!node)
            return;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        }
        else if (node === this.head) {
            this.head = this.head.next;
            this.head.back = null;
        }
        else if (node === this.tail) {
            this.tail = this.tail.back;
            this.tail.next = null;
        }
        else {
            node.back.next = node.next;
            node.next.back = node.back;
        }
        this.length--;
    };
    DoublyLinkedList.prototype.copyList = function () {
        var newList = new DoublyLinkedList();
        if (!this.head || !this.tail)
            return newList;
        for (var itr = this.begin(); itr.current() !== null; itr.next()) {
            newList.insertLast(itr.data());
        }
        return newList;
    };
    DoublyLinkedList.prototype.find = function (data) {
        if (!this.head)
            return;
        for (var itr = this.begin(); itr.current() !== null; itr.next()) {
            if (itr.data() === data) {
                return itr.current();
            }
        }
    };
    DoublyLinkedList.prototype.printList = function () {
        if (!this.head)
            return;
        for (var itr = this.begin(); itr.current() !== null; itr.next()) {
            console.log(itr.data());
        }
    };
    DoublyLinkedList.prototype.begin = function () {
        if (!this.head)
            throw new Error("No items in the list yet");
        var itr = new DoublyLinkedIterator(this.head);
        return itr;
    };
    return DoublyLinkedList;
}());
var list = new DoublyLinkedList();
list.insertLast(1);
list.insertLast(2);
list.insertLast(3);
list.insertBefore(3, 5);
list.deleteNode(3);
var list2 = list.copyList();
list.printList();
list2.printList();
