const Stack = class {
  /** @type {*[]} */
  #contents;

  constructor () {
    this.clear();
  }


  /** @type {*} */
  get next () {
    return this.#contents[this.size - 1];
  }

  /** @type {number} */
  get size () {
    return this.#contents.length;
  }


  /**
   * @param {...*} data
   * @returns {number}
   * @complexity O(1)
   */
  add (...data) {
    return this.#contents.push(...data);
  }

  /**
   * @returns {*}
   * @complexity O(1)
   */
  remove () {
    return this.#contents.pop();
  }

  /**
   * @returns {undefined}
   * @complexity O(1)
   */
  clear () {
    this.#contents = [];
  }


  /** @type {Function} */
  [Symbol.iterator] () {
    return this.#contents.reverse()[Symbol.iterator]();
  }
};
export default Stack;
