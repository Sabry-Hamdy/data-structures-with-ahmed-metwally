class MyArray {
  public resize<T>(source: T[], newSize: number): void {
    if (newSize <= 0) return;
    if (!source) return;
    if (newSize === source.length) return;

    source.length = newSize;
  }
}

// let array: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let array: number[] = [1];
let a: MyArray = new MyArray();

a.resize<number>(array, 1);
console.log(array);
