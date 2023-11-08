import Heap from "./heap.js";


const PriorityQueue = class {
  /** @type {Heap} */
  #heap;

  /**
   * @param {Function} comparator
   * @param {Function} sorter
   */
  constructor (comparator, sorter) {
    this.#heap = new Heap(comparator, sorter);
  }


  /** @type {*} */
  get next () {
    return this.#heap.next;
  }

  /** @type {number} */
  get size () {
    return this.#heap.size;
  }


  /**
   * @param {...*} elements
   * @returns {number}
   * @complexity O(logN)
   */
  add (...elements) {
    return this.#heap.add(...elements);
  }

  /**
   * @returns {undefined}
   * @complexity O(logN)
   */
  update () {
    this.#heap.update();
  }

  /**
   * @returns {*}
   * @complexity O(logN)
   */
  remove () {
    return this.#heap.remove();
  }

  /**
   * @returns {undefined}
   * @complexity O(1)
   */
  clear () {
    this.#heap.clear();
  }


  /** @type {Function} */
  [Symbol.iterator] () {
    return this.#heap[Symbol.iterator]();
  }
};
export default PriorityQueue;
