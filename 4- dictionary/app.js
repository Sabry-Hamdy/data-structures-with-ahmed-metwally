var Dictionary = /** @class */ (function () {
    function Dictionary() {
        this.entries = [];
        this.entriesCount = 0;
    }
    Dictionary.prototype.set = function (key, value) {
        for (var i = 0; i < this.entriesCount; i++) {
            if (this.entries[i] !== null && this.entries[i].key === key) {
                this.entries[i].value = value;
                return;
            }
        }
        var newPair = new KeyValuePair(key, value);
        this.entries[this.entriesCount] = newPair;
        this.entriesCount++;
    };
    Dictionary.prototype.get = function (key) {
        if (this.entriesCount === 0)
            return null;
        for (var i = 0; i < this.entriesCount; i++) {
            if (this.entries[i] !== null && this.entries[i].key === key) {
                return this.entries[i].value;
            }
        }
        return null;
    };
    Dictionary.prototype.remove = function (key) {
        if (this.entriesCount === 0)
            return false;
        for (var i = 0; i < this.entriesCount; i++) {
            if (this.entries[i] !== null && this.entries[i].key === key) {
                this.entries[i] = this.entries[this.entriesCount - 1];
                this.entriesCount--;
                return true;
            }
        }
        return false;
    };
    Dictionary.prototype.print = function () {
        console.log("---------------");
        console.log("the length is: " + this.entriesCount);
        for (var i = 0; i < this.entriesCount; i++) {
            console.log("key is: ".concat(this.entries[i].key, ", value is: ").concat(this.entries[i].value));
        }
    };
    return Dictionary;
}());
var KeyValuePair = /** @class */ (function () {
    function KeyValuePair(key, val) {
        this.key = key;
        this.value = val;
    }
    return KeyValuePair;
}());
var dic = new Dictionary();
dic.print();
dic.set("Sinar", "sinar@gmail.com");
dic.set("Elvis", "elvis@gmail.com");
dic.print();
dic.set("Tane", "tane@gmail.com");
dic.set("Gerti", "gerti@gmail.com");
dic.set("Arist", "arist@gmail.com");
// dic.set("rArist", "rarist@gmail.com");
// dic.set("tArist", "tarist@gmail.com");
// dic.set("yArist", "yarist@gmail.com");
dic.print();
console.log(dic.get("Tane"));
console.log(dic.get("Sinar"));
console.log(dic.get("Elviaaa"));
dic.remove("Sinar");
dic.remove("Elvis");
dic.remove("Tane");
dic.remove("Gerti");
dic.remove("Arist");
dic.print();
dic.set("Sinar", "sinar@gmail.com");
dic.print();
