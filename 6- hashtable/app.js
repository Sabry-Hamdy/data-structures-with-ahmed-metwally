var HashTable = /** @class */ (function () {
    function HashTable() {
        this.entries = new Array(8); // initial size
        this.entriesCount = 0;
    }
    HashTable.prototype.set = function (key, value) {
        this.resizeOrNot();
        this.addToEntries(key, value);
    };
    HashTable.prototype.get = function (key) {
        var index = this.getHash(key);
        var item = this.entries[index];
        if (this.entries[index] && this.entries[index].key !== key) {
            index = this.collisionHandling(key, index, false);
            if (index === -1 || !this.entries[index])
                return null;
            item = this.entries[index];
        }
        if (item.key === key) {
            return item.value;
        }
        else {
            return null;
        }
    };
    HashTable.prototype.addToEntries = function (key, value) {
        var index = this.getHash(key);
        var item = this.entries[index];
        if ((item === null || item === void 0 ? void 0 : item.key) && item.key !== key) {
            index = this.collisionHandling(key, index, true);
            if (index === -1)
                console.error("No place to insert new item");
            item = this.entries[index];
        }
        if (!item) {
            var newItem = new KeyValuePair(key, value);
            this.entries[index] = newItem;
            this.entriesCount++;
        }
        else if (item.key === key) {
            item.value = value;
        }
        else {
            throw new Error("Unexpected collision handling failure");
        }
    };
    HashTable.prototype.size = function () {
        return this.entries.length;
    };
    HashTable.prototype.count = function () {
        return this.entriesCount;
    };
    HashTable.prototype.collisionHandling = function (key, hash, set) {
        var _a;
        var newHash;
        for (var i = 1; i < this.size(); i++) {
            newHash = (hash + i) % this.size();
            console.log("[COLL]" + key + " " + hash + ", new hash: " + newHash);
            if (set && (!this.entries[newHash] || this.entries[newHash].key === key)) {
                return newHash;
            }
            else if (!set && ((_a = this.entries[newHash]) === null || _a === void 0 ? void 0 : _a.key) === key) {
                return newHash;
            }
        }
        return -1;
    };
    HashTable.prototype.resizeOrNot = function () {
        if (this.entriesCount < this.size()) {
            return;
        }
        else {
            var newSize = this.size() * 2;
            var oldEntries = this.entries;
            this.entriesCount = 0;
            this.entries = new Array(newSize);
            for (var _i = 0, oldEntries_1 = oldEntries; _i < oldEntries_1.length; _i++) {
                var entry = oldEntries_1[_i];
                if (entry) {
                    this.addToEntries(entry.key, entry.value);
                }
            }
        }
    };
    HashTable.prototype.print = function () {
        console.log("-----------");
        console.log("[Size] " + this.count());
        for (var i = 0; i < this.entries.length; i++) {
            if (!this.entries[i]) {
                console.log("[" + i + "] null");
            }
            else {
                console.log("[" + i + "] " + this.entries[i].key + ":" + this.entries[i].value);
            }
        }
        console.log("============");
    };
    HashTable.prototype.getHash = function (key) {
        // FNV constants for 32-bit hashes
        var FNV_OFFSET_BASIS = 2166136261; // Hexadecimal: 0x811C9DC5
        var FNV_PRIME = 16777619; // Hexadecimal: 0x01000193
        // Initialize hash to FNV offset basis
        var hash = FNV_OFFSET_BASIS;
        // Convert string to bytes using UTF-8 encoding
        // Input: JavaScript string (UTF-16)
        // Output: Uint8Array of UTF-8 bytes
        var encoder = new TextEncoder();
        var data = encoder.encode(key);
        // Process each byte in the array
        for (var i = 0; i < data.length; i++) {
            // XOR hash with current byte
            // JavaScript converts bytes to 32-bit integers automatically
            hash ^= data[i];
            // Multiply by FNV prime and maintain 32-bit integer
            // Using Math.imul for proper 32-bit multiplication
            hash = Math.imul(hash, FNV_PRIME);
            // Convert to unsigned 32-bit integer using zero-fill right shift
            hash >>>= 0;
        }
        // Final conversion to ensure unsigned 32-bit integer
        hash = hash >>> 0;
        console.log("[hash] " + key + " " + hash + " " + hash.toString(16) + " " + (hash % this.entries.length));
        return hash % this.size();
    };
    HashTable.prototype.hash64 = function (str) {
        var FNV_OFFSET_BASIS_64 = 0xcbf29ce484222325n;
        var FNV_PRIME_64 = 0x100000001b3n;
        var encoder = new TextEncoder();
        var bytes = encoder.encode(str);
        var hash = FNV_OFFSET_BASIS_64;
        for (var _i = 0, bytes_1 = bytes; _i < bytes_1.length; _i++) {
            var byte = bytes_1[_i];
            hash ^= BigInt(byte);
            hash *= FNV_PRIME_64;
            hash &= 0xffffffffffffffffn;
        }
        return hash;
    };
    return HashTable;
}());
var KeyValuePair = /** @class */ (function () {
    function KeyValuePair(key, value) {
        this.key = key;
        this.value = value;
    }
    return KeyValuePair;
}());
var table = new HashTable();
// console.log(table.entriesCount);
table.print();
table.set("Sinar", "sinar@gmail.com");
table.set("Elvis", "elvis@gmail.com");
table.set("Tane", "tane@gmail.com");
table.print();
// console.log("[get] " + table.get("Sinar"));
// console.log("[get] " + table.get("Tane"));
// table.set("Gerti", "gerti@gmail.com");
// table.set("Arist", "arist@gmail.com");
// table.print();
// console.log("[get] " + table.get("Sinar"));
