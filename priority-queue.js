import Heap from "./heap.js";


/**
 * @template T
 */
const PriorityQueue = class {
  /** @type {Heap} */ #heap;

  /**
   * @param {Function} comparator
   * @param {Function} [sorter]
   */
  constructor (comparator, sorter) {
    this.#heap = new Heap(comparator, sorter);
  }


  /** @type {T} */
  get next () {
    return this.#heap.next;
  }

  /** @type {number} */
  get size () {
    return this.#heap.size;
  }


  /**
   * @returns {undefined}
   * @complexity O(logN)
   */
  update () {
    this.#heap.update();
  }


  /**
   * @param {...T} elements
   * @returns {number} size
   * @complexity O(logN)
   */
  add (...elements) {
    return this.#heap.add(...elements);
  }

  /**
   * @returns {T}
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


  /**
   * @returns {Iterator<T>}
   */
  [Symbol.iterator] () {
    return this.#heap[Symbol.iterator]();
  }
};
export default PriorityQueue;
