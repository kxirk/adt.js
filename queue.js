import LinkedList from "./linked-list.js";


const Queue = class {
  /** @type {LinkedList} */
  #list;

  constructor () {
    this.#list = new LinkedList();
  }


  /** @type {*} */
  get next () {
    return this.#list.get(0);
  }

  /** @type {number} */
  get size () {
    return this.#list.size;
  }


  /**
   * @param {...*} data
   * @returns {number}
   * @complexity O(1)
   */
  add (...data) {
    return this.#list.push(...data);
  }

  /**
   * @returns {*}
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


  /** @type {Iterator<*>} */
  [Symbol.iterator] () {
    return this.#list[Symbol.iterator]();
  }
};
export default Queue;
