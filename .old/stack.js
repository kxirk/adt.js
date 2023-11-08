const Stack = class {
  /** @type {*[]} */
  #contents;

  constructor () {
    this.#contents = [];
  }


  /** @type {number} */
  get length () {
    return this.#contents.length;
  }

  /** @type {*} */
  get next () {
    return this.#contents.last;
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
  pop () {
    return this.#contents.pop();
  }


  /** @type {Function} */
  [Symbol.iterator] () {
    return this.#contents.reverse()[Symbol.iterator]();
  }
};
export default Stack;
