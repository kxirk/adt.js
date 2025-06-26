/**
 * @template T
 */
const Stack = class {
  /** @type {T[]} */ #contents;

  constructor () {
    this.#contents = [];
  }


  /** @type {T} */
  get next () {
    return this.#contents[this.size - 1];
  }

  /** @type {number} */
  get size () {
    return this.#contents.length;
  }


  /**
   * @param {...T} data
   * @returns {number} size
   * @complexity O(1)
   */
  add (...data) {
    return this.#contents.push(...data);
  }

  /**
   * @returns {T} next
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
    this.#contents.length = 0;
  }


  /**
   * @returns {Iterator<T>}
   */
  [Symbol.iterator] () {
    return this.#contents.toReversed().values();
  }
};
export default Stack;
