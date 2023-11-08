import Queue from "./queue.js";


const CircularQueue = class extends Queue {
  /** @type {number} */
  #size;
  /** @type */
  #replace;

  /**
   * @param {number} [size]
   * @param {boolean} [replace]
   */
  constructor (size = Infinity, replace = true) {
    super();

    this.size = size;
    this.replace = replace;
  }


  /** @type {number} */
  get size () { return this.#size; }
  set size (size) {
    this.#size = (size > 0 ? size : (this.size ?? Infinity));
  }

  /** @type {boolean} */
  get replace () { return this.#replace; }
  set replace (replace) { this.#replace = replace; }


  /**
   * @param {...*} elements
   * @returns {number}
   * @complexity O(1)
   */
  push (...elements) {
    if (this.replace) {
      super.push(...elements);
      while (this.length > this.size) this.shift();
    }
    else {
      while (this.length < this.size && elements.length > 0) {
        super.push( elements.shift() );
      }
    }

    return this.length;
  }
};


export default CircularQueue;
