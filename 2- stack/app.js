var Stack = /** @class */ (function () {
    function Stack() {
        this.stack = [];
        this.topIndex = -1;
    }
    Stack.prototype.push = function (data) {
        this.stack.push(data);
        this.topIndex++;
    };
    Stack.prototype.pop = function () {
        var data = this.stack.splice(this.topIndex, 1).at(0);
        this.topIndex--;
        return data;
    };
    Stack.prototype.peek = function () {
        return this.stack.at(this.topIndex);
    };
    Stack.prototype.isEmpty = function () {
        return this.stack.length === 0;
    };
    Stack.prototype.size = function () {
        return this.stack.length;
    };
    Stack.prototype.print = function () {
        var dataList = "";
        for (var i = this.topIndex; i >= 0; i--) {
            dataList += this.stack.at(i) + " -> ";
        }
        return dataList;
    };
    return Stack;
}());
var stack = new Stack();
console.log("isEmpty: " + stack.isEmpty());
stack.push(1);
stack.push(2);
stack.push(3);
stack.pop();
console.log(stack.print());
