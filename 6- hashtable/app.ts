class HashTable<Tkey extends string, Tvalue> {
  private entries: KeyValuePair<Tkey, Tvalue>[];
  entriesCount: number;

  constructor() {
    this.entries = new Array(8); // initial size
    this.entriesCount = 0;
  }

  set(key: Tkey, value: Tvalue) {
    this.resizeOrNot();
    this.addToEntries(key, value);
  }

  get(key: Tkey) {
    let index = this.getHash(key);
    let item = this.entries[index];

    if (this.entries[index] && this.entries[index].key !== key) {
      index = this.collisionHandling(key, index, false);
      if (index === -1 || !this.entries[index]) return null;
      item = this.entries[index];
    }

    if (item.key === key) {
      return item.value;
    } else {
      return null;
    }
  }

  addToEntries(key: Tkey, value: Tvalue) {
    let index: number = this.getHash(key);
    let item = this.entries[index];

    if (item?.key && item.key !== key) {
      index = this.collisionHandling(key, index, true);
      if (index === -1) console.error("No place to insert new item");
      item = this.entries[index];
    }

    if (!item) {
      const newItem = new KeyValuePair(key, value);
      this.entries[index] = newItem;
      this.entriesCount++;
    } else if (item.key === key) {
      item.value = value;
    } else {
      throw new Error("Unexpected collision handling failure");
    }
  }

  size() {
    return this.entries.length;
  }

  count() {
    return this.entriesCount;
  }

  collisionHandling(key: Tkey, hash: number, set: boolean) {
    let newHash: number;

    for (let i = 1; i < this.size(); i++) {
      newHash = (hash + i) % this.size();

      console.log("[COLL]" + key + " " + hash + ", new hash: " + newHash);

      if (set && (!this.entries[newHash] || this.entries[newHash].key === key)) {
        return newHash;
      } else if (!set && this.entries[newHash]?.key === key) {
        return newHash;
      }
    }

    return -1;
  }

  resizeOrNot() {
    if (this.entriesCount < this.size()) {
      return;
    } else {
      const newSize = this.size() * 2;
      const oldEntries = this.entries;

      this.entriesCount = 0;
      this.entries = new Array(newSize);
      for (const entry of oldEntries) {
        if (entry) {
          this.addToEntries(entry.key, entry.value);
        }
      }
    }
  }

  print() {
    console.log("-----------");
    console.log("[Size] " + this.count());

    for (let i = 0; i < this.entries.length; i++) {
      if (!this.entries[i]) {
        console.log("[" + i + "] null");
      } else {
        console.log("[" + i + "] " + this.entries[i].key + ":" + this.entries[i].value);
      }
    }

    console.log("============");
  }

  getHash(key: Tkey) {
    // FNV constants for 32-bit hashes
    const FNV_OFFSET_BASIS = 2166136261; // Hexadecimal: 0x811C9DC5
    const FNV_PRIME = 16777619; // Hexadecimal: 0x01000193

    // Initialize hash to FNV offset basis
    let hash = FNV_OFFSET_BASIS;

    // Convert string to bytes using UTF-8 encoding
    // Input: JavaScript string (UTF-16)
    // Output: Uint8Array of UTF-8 bytes
    const encoder = new TextEncoder();
    const data = encoder.encode(key);

    // Process each byte in the array
    for (let i = 0; i < data.length; i++) {
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
  }

  hash64(str: string) {
    const FNV_OFFSET_BASIS_64 = 0xcbf29ce484222325n;
    const FNV_PRIME_64 = 0x100000001b3n;

    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);

    let hash = FNV_OFFSET_BASIS_64;
    for (const byte of bytes) {
      hash ^= BigInt(byte);
      hash *= FNV_PRIME_64;
      hash &= 0xffffffffffffffffn;
    }

    return hash;
  }
}

class KeyValuePair<Tkey extends string, Tvalue> {
  public readonly key: Tkey;
  public value: Tvalue;

  constructor(key: Tkey, value: Tvalue) {
    this.key = key;
    this.value = value;
  }
}
const table = new HashTable<string, string>();
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
