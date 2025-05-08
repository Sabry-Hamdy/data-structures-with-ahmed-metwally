class Queue<T> {
  private dataList: T[];
  private length: number;

  constructor() {
    this.dataList = [];
    this.length = 0;
  }

  enqueue(data: T) {
    this.dataList.push(data);
    this.length++;
  }

  dequeue() {
    const data = this.dataList.splice(0, 1)[0];
    this.length--;
    return data;
  }

  peek() {
    return this.dataList[0];
  }

  size() {
    return this.length;
  }

  hasData() {
    return this.length > 0;
  }

  print() {
    return this.dataList.join(" -> ");
  }
}

const queue = new Queue();

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
