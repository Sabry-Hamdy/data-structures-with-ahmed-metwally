interface DLNode<T> {
  data: T;
  back: DLNode<T> | null;
  next: DLNode<T> | null;
}

class DoublyLinkedNode<T> implements DLNode<T> {
  public data: T;
  public back: DLNode<T> | null;
  public next: DLNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.back = null;
    this.next = null;
  }
}

class DoublyLinkedIterator<T> {
  private currentNode: DLNode<T> | null;

  constructor(node: DLNode<T>) {
    this.currentNode = node;
  }

  data() {
    if (!this.currentNode) return;
    return this.currentNode.data;
  }
  next() {
    if (!this.currentNode) return;
    this.currentNode = this.currentNode.next;
  }
  back() {
    if (!this.currentNode) return;
    this.currentNode = this.currentNode.back;
  }
  current() {
    return this.currentNode;
  }
}

class DoublyLinkedList<T> {
  public head: DLNode<T> | null;
  public tail: DLNode<T> | null;
  public length: number = 0;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  insertLast(data: T) {
    if (!data) return;

    const newNode = new DoublyLinkedNode<T>(data);

    if (this.head === null || this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.back = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  insertAfter(afterData: T, data: T) {
    let node = this.find(afterData);
    if (!node) return;

    let newNode = new DoublyLinkedNode(data);
    newNode.back = node;
    newNode.next = node.next;

    node.next = newNode;

    if (newNode.next === null) {
      this.tail = newNode;
    } else {
      newNode.next.back = newNode;
    }

    this.length++;
  }

  insertBefore(beforeData: T, data: T) {
    let node = this.find(beforeData);
    if (!node) return;

    let newNode = new DoublyLinkedNode(data);
    newNode.next = node;
    newNode.back = node.back;

    node.back = newNode;

    if (newNode.back === null) {
      this.head = newNode;
    } else {
      newNode.back.next = newNode;
    }

    this.length++;
  }

  deleteNode(data: T) {
    const node = this.find(data);
    if (!node) return;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else if (node === this.head) {
      this.head = this.head.next;
      this.head!.back = null;
    } else if (node === this.tail) {
      this.tail = this.tail.back;
      this.tail!.next = null;
    } else {
      node.back!.next = node.next;
      node.next!.back = node.back;
    }

    this.length--;
  }

  copyList() {
    const newList = new DoublyLinkedList();
    if (!this.head || !this.tail) return newList;

    for (let itr = this.begin(); itr.current() !== null; itr.next()) {
      newList.insertLast(itr.data());
    }

    return newList;
  }

  find(data: T) {
    if (!this.head) return;
    for (let itr = this.begin(); itr.current() !== null; itr.next()) {
      if (itr.data() === data) {
        return itr.current();
      }
    }
  }

  printList() {
    if (!this.head) return;
    for (let itr = this.begin(); itr.current() !== null; itr.next()) {
      console.log(itr.data());
    }
  }

  begin() {
    if (!this.head) throw new Error("No items in the list yet");
    let itr = new DoublyLinkedIterator(this.head);
    return itr;
  }
}

const list = new DoublyLinkedList();
list.insertLast(1);
list.insertLast(2);
list.insertLast(3);
list.insertBefore(3, 5);
list.deleteNode(3);

const list2 = list.copyList();

list.printList();
list2.printList();
