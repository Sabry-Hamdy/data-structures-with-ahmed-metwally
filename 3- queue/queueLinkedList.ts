import { LinkedList } from "./linkedList.js";

class Queue<T> {
  private dataList: LinkedList<T>;

  constructor() {
    this.dataList = new LinkedList();
  }

  enqueue(data: T) {
    this.dataList.insertLast(data);
  }

  dequeue() {
    if (!this.dataList.head) return;

    const data = this.dataList.head.data;
    this.dataList.deleteHead();
    return data;
  }

  peek() {
    if (!this.dataList.head) return;

    return this.dataList.head.data;
  }

  size() {
    return this.dataList.count;
  }

  isEmpty() {
    return this.dataList.count === 0;
  }

  print() {
    return this.dataList.printList();
  }
}

const queue = new Queue();

console.log(queue.isEmpty());
queue.enqueue(11);
queue.enqueue(23);
queue.enqueue(34);
console.log(queue.isEmpty());
console.log(queue.size());
console.log(queue.print());

queue.dequeue();
console.log(queue.size());
console.log(queue.print());
console.log(queue.peek());
