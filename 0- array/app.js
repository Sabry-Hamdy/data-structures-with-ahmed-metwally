var MyArray = /** @class */ (function () {
    function MyArray() {
    }
    MyArray.prototype.resize = function (source, newSize) {
        if (newSize <= 0)
            return;
        if (!source)
            return;
        if (newSize === source.length)
            return;
        source.length = newSize;
    };
    return MyArray;
}());
// let array: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var array = [1];
var a = new MyArray();
a.resize(array, 1);
console.log(array);
