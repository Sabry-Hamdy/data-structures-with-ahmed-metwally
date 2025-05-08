class Queue<Tdata> {
  private dataList: TreeNode<Tdata>[];
  private count: number;
  private topIndex: number;

  constructor() {
    this.dataList = [];
    this.count = 0;
    this.topIndex = 0;
  }

  enqueue(data: TreeNode<Tdata>) {
    this.dataList.push(data);
    this.count++;
  }

  dequeue() {
    if (this.count === 0) return null;

    const data = this.dataList.splice(this.topIndex, 1).at(0);
    this.count--;

    return data;
  }

  size() {
    return this.count;
  }

  hasItems() {
    return this.count > 0;
  }

  print() {
    if (this.count === 0) return null;

    for (const data of this.dataList) {
      console.log(data);
    }
  }
}

class TreeNode<Tdata> {
  data: Tdata;
  left: TreeNode<Tdata> | null;
  right: TreeNode<Tdata> | null;

  constructor(data: Tdata) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree<Tdata> {
  root: TreeNode<Tdata> | null;

  constructor() {
    this.root = null;
  }

  insert(data: Tdata) {
    const newNode = new TreeNode(data);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    const q = new Queue<Tdata>();
    q.enqueue(this.root);

    while (q.hasItems()) {
      const currentNode = q.dequeue()!;

      if (currentNode.left === null) {
        currentNode.left = newNode;
        break;
      } else {
        q.enqueue(currentNode.left);
      }

      if (currentNode.right === null) {
        currentNode.right = newNode;
        break;
      } else {
        q.enqueue(currentNode.right);
      }
    }
  }

  print() {
    if (!this.root) return;

    const q = new Queue<Tdata>();
    q.enqueue(this.root);

    let str = "";

    while (q.hasItems()) {
      const currentNode = q.dequeue();

      if (!currentNode) return;

      str += currentNode.data + " -> ";

      if (currentNode.left) q.enqueue(currentNode.left);
      if (currentNode.right) q.enqueue(currentNode.right);
    }

    console.log(str);
  }
}

const b = new BinaryTree();

b.insert(1);
b.insert(2);
b.insert(3);
b.insert(4);
b.insert(5);
b.insert(6);
b.insert(7);

b.print();
