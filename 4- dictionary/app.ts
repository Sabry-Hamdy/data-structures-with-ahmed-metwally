class Dictionary<Tkey, Tvalue> {
  private entries: KeyValuePair<Tkey, Tvalue>[];
  private entriesCount: number;

  constructor() {
    this.entries = [];
    this.entriesCount = 0;
  }

  set(key: Tkey, value: Tvalue) {
    for (let i = 0; i < this.entriesCount; i++) {
      if (this.entries[i] !== null && this.entries[i].key === key) {
        this.entries[i].value = value;
        return;
      }
    }

    const newPair = new KeyValuePair(key, value);
    this.entries[this.entriesCount] = newPair;
    this.entriesCount++;
  }

  get(key: Tkey) {
    if (this.entriesCount === 0) return null;

    for (let i = 0; i < this.entriesCount; i++) {
      if (this.entries[i] !== null && this.entries[i].key === key) {
        return this.entries[i].value;
      }
    }

    return null;
  }

  remove(key: Tkey): boolean {
    if (this.entriesCount === 0) return false;

    for (let i = 0; i < this.entriesCount; i++) {
      if (this.entries[i] !== null && this.entries[i].key === key) {
        this.entries[i] = this.entries[this.entriesCount - 1];
        this.entriesCount--;
        return true;
      }
    }

    return false;
  }

  print() {
    console.log("---------------");
    console.log("the length is: " + this.entriesCount);
    for (let i = 0; i < this.entriesCount; i++) {
      console.log(`key is: ${this.entries[i].key}, value is: ${this.entries[i].value}`);
    }
  }
}

class KeyValuePair<Tkey, Tvalue> {
  readonly key: Tkey;
  value: Tvalue;

  constructor(key: Tkey, val: Tvalue) {
    this.key = key;
    this.value = val;
  }
}

const dic = new Dictionary<string, string>();
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
