class Stack<T> {
  private stack: T[];
  private topIndex: number;

  constructor() {
    this.stack = [];
    this.topIndex = -1;
  }

  push(data: T) {
    this.stack.push(data);
    this.topIndex++;
  }

  pop() {
    const data = this.stack.splice(this.topIndex, 1).at(0);
    this.topIndex--;

    return data;
  }

  peek() {
    return this.stack.at(this.topIndex);
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  size() {
    return this.stack.length;
  }

  print() {
    let dataList: string = "";

    for (let i = this.topIndex; i >= 0; i--) {
      dataList += this.stack.at(i) + " -> ";
    }

    return dataList;
  }
}

const stack = new Stack();
console.log("isEmpty: " + stack.isEmpty());
stack.push(1);
stack.push(2);
stack.push(3);
stack.pop();

console.log(stack.print());
