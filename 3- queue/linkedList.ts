interface LNode<T> {
  data: T;
  next: LNode<T> | null;
}

class LinkedListNode<T> implements LNode<T> {
  public data: T;
  public next: LNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

class LinkedListIterator<T> {
  private currentNode: LNode<T> | null;

  constructor(node: LNode<T>) {
    this.currentNode = node;
  }

  data() {
    if (!this.currentNode) throw new Error("No node to show its data");
    return this.currentNode.data;
  }

  next() {
    if (!this.currentNode) return;
    this.currentNode = this.currentNode.next;
  }

  current() {
    return this.currentNode;
  }
}

export class LinkedList<T> {
  public head: LNode<T> | null;
  public tail: LNode<T> | null;
  public count: number = 0;
  private unique: boolean;

  constructor(unique?: boolean) {
    this.head = null;
    this.tail = null;
    this.unique = unique ?? false;
  }

  public insertFirst(data: T) {
    if (this.isThere(data)) return;

    const newNode = new LinkedListNode(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.count++;
  }

  public deleteHead() {
    if (!this.head) return;

    this.head = this.head.next;
    this.count--;
  }

  public insertLast(data: T) {
    if (this.isThere(data)) return;

    const newNode: LNode<T> = new LinkedListNode(data);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) this.tail.next = newNode;
      this.tail = newNode;
    }

    this.count++;
  }

  public insertAfter(searchData: T, data: T) {
    if (!this.head) return;
    if (this.isThere(data)) return;

    let node = this.find(searchData);
    if (!node) return;

    let newNode = new LinkedListNode(data);

    if (node === this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      newNode.next = node.next;
      node.next = newNode;
    }

    this.count++;
  }

  public insertBefore(searchData: T, data: T) {
    if (!this.head) return;
    if (this.isThere(data)) return;

    let node = this.find(searchData);
    if (!node) return;

    let newNode = new LinkedListNode(data);
    newNode.next = node;

    if (node === this.head) {
      this.head = newNode;
    } else {
      let parent = this.findParent(node);
      if (!parent) return;
      parent.next = newNode;
    }

    this.count++;
  }

  public deleteNode(data: T) {
    let node = this.find(data);
    if (!node) return;

    if (this.count === 1) {
      this.head = null;
      this.tail = null;
    } else if (node === this.head) {
      this.head = this.head.next;
    } else {
      let parent = this.findParent(node);
      if (!parent) return;

      parent.next = node.next; // always update the parent

      if (node === this.tail) {
        parent.next = null;
        this.tail = parent;
      }
    }

    this.count--;
  }

  public findParent(node: LNode<T>) {
    for (let itr = this.begin(); itr.current() !== null; itr.next()) {
      if (itr.current()!.next === node) {
        return itr.current();
      }
    }

    return null;
  }

  public find(data: T): LNode<T> | null {
    if (this.count === 0) return null;
    for (let itr = this.begin(); itr.current() !== null; itr.next()) {
      if (itr.data() === data) {
        return itr.current();
      }
    }

    return null;
  }

  public isThere(data: T) {
    return this.unique && this.find(data) ? true : false;
  }

  private begin() {
    if (!this.head) throw new Error("No items in the list");
    const itr = new LinkedListIterator(this.head);
    return itr;
  }

  public printList() {
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
