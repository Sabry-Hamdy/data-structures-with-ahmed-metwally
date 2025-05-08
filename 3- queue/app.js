var Queue = /** @class */ (function () {
    function Queue() {
        this.dataList = [];
        this.length = 0;
    }
    Queue.prototype.enqueue = function (data) {
        this.dataList.push(data);
        this.length++;
    };
    Queue.prototype.dequeue = function () {
        var data = this.dataList.splice(0, 1)[0];
        this.length--;
        return data;
    };
    Queue.prototype.peek = function () {
        return this.dataList[0];
    };
    Queue.prototype.size = function () {
        return this.length;
    };
    Queue.prototype.hasData = function () {
        return this.length > 0;
    };
    Queue.prototype.print = function () {
        return this.dataList.join(" -> ");
    };
    return Queue;
}());
var queue = new Queue();
console.log("is empty: " + queue.hasData());
queue.enqueue(11);
queue.enqueue(23);
queue.enqueue(34);
console.log("is empty: " + queue.hasData());
console.log("the size is: " + queue.size());
console.log(queue.print());
queue.dequeue();
queue.dequeue();
console.log("the size is: " + queue.size());
console.log(queue.print());
console.log("the head is: " + queue.peek());
