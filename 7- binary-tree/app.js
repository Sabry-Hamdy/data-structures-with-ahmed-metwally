var Queue = /** @class */ (function () {
    function Queue() {
        this.dataList = [];
        this.count = 0;
        this.topIndex = 0;
    }
    Queue.prototype.enqueue = function (data) {
        this.dataList.push(data);
        this.count++;
    };
    Queue.prototype.dequeue = function () {
        if (this.count === 0)
            return null;
        var data = this.dataList.splice(this.topIndex, 1).at(0);
        this.count--;
        return data;
    };
    Queue.prototype.size = function () {
        return this.count;
    };
    Queue.prototype.hasItems = function () {
        return this.count > 0;
    };
    Queue.prototype.print = function () {
        if (this.count === 0)
            return null;
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var data = _a[_i];
            console.log(data);
        }
    };
    return Queue;
}());
var TreeNode = /** @class */ (function () {
    function TreeNode(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
    return TreeNode;
}());
var BinaryTree = /** @class */ (function () {
    function BinaryTree() {
        this.root = null;
    }
    BinaryTree.prototype.insert = function (data) {
        var newNode = new TreeNode(data);
        if (this.root === null) {
            this.root = newNode;
            return;
        }
        var q = new Queue();
        q.enqueue(this.root);
        while (q.hasItems()) {
            var currentNode = q.dequeue();
            if (currentNode.left === null) {
                currentNode.left = newNode;
                break;
            }
            else {
                q.enqueue(currentNode.left);
            }
            if (currentNode.right === null) {
                currentNode.right = newNode;
                break;
            }
            else {
                q.enqueue(currentNode.right);
            }
        }
    };
    BinaryTree.prototype.print = function () {
        if (!this.root)
            return;
        var q = new Queue();
        q.enqueue(this.root);
        var str = "";
        while (q.hasItems()) {
            var currentNode = q.dequeue();
            if (!currentNode)
                return;
            str += currentNode.data + " -> ";
            if (currentNode.left)
                q.enqueue(currentNode.left);
            if (currentNode.right)
                q.enqueue(currentNode.right);
        }
        console.log(str);
    };
    return BinaryTree;
}());
var b = new BinaryTree();
b.insert(1);
b.insert(2);
b.insert(3);
b.insert(4);
b.insert(5);
b.insert(6);
b.insert(7);
b.print();
