import LinkedList from "./linked-list.js";


/**
 * @template T
 */
const Queue = class {
  /** @type {LinkedList<T>} */ #list;

  constructor () {
    this.#list = new LinkedList();
  }


  /** @type {T} */
  get next () {
    return this.#list.get(0);
  }

  /** @type {number} */
  get size () {
    return this.#list.size;
  }


  /**
   * @param {...T} data
   * @returns {number} size
   * @complexity O(1)
   */
  add (...data) {
    return this.#list.push(...data);
  }

  /**
   * @returns {T} next
   * @complexity O(1)
   */
  remove () {
    return this.#list.shift();
  }


  /**
   * @returns {undefined}
   * @complexity O(1)
   */
  clear () {
    this.#list.clear();
  }


  /**
   * @returns {Iterator<T>}
   */
  [Symbol.iterator] () {
    return this.#list[Symbol.iterator]();
  }
};
export default Queue;
