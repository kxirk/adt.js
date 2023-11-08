import Heap from "./heap.js";


const PriorityQueue = class {
  /** @type {Heap} */
  #contents;

  /**
   * @param {Function} comparator
   * @param {Function} sorter
   */
  constructor (comparator, sorter) {
    this.#contents = new Heap(comparator, sorter);
  }


  /** @type {*} */
  get next () {
    return this.#contents.next;
  }

  /** @type {number} */
  get length () {
    return this.#contents.length;
  }


  /**
   * @param {...*} elements
   * @returns {number}
   * @complexity O(logN)
   */
  push (...elements) {
    this.#contents.insert(...elements);

    return this.length;
  }

  /**
   * @returns {*}
   * @complexity O(logN)
   */
  shift () {
    return this.#contents.remove();
  }


  /** @type {Function} */
  [Symbol.iterator] () {
    return this.#contents[Symbol.iterator]();
  }
};
export default PriorityQueue;
