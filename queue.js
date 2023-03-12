import LinkedList from "./linked-list.js";


const Queue = class {
  /** @type {LinkedList} */
  #contents;

  constructor () {
    this.#contents = new LinkedList();
  }


  /** @type {*} */
  get next () {
    return this.#contents.get(0);
  }

  /** @type {number} */
  get length () {
    return this.#contents.length;
  }


  /**
   * @param {...*} elements
   * @returns {number}
   * @complexity O(1)
   */
  push (...elements) {
    return this.#contents.push(...elements);
  }

  /**
   * @returns {*}
   * @complexity O(1)
   */
  shift () {
    return this.#contents.shift();
  }


  /** @type {Function} */
  [Symbol.iterator] () {
    return this.#contents[Symbol.iterator]();
  }
};


export default Queue;
