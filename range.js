const Range = class {
  /** @type {number} */ #min;
  /** @type {number} */ #max;
  /** @type {number} */ #step;

  /**
   * @param {number} min
   * @param {number} [max]
   * @param {number} [step]
   */
  constructor (min, max = Infinity, step = 1) {
    this.#min = min;
    this.#max = max;
    this.#step = step;
  }


  /** @type {number} */
  get min () { return this.#min; }
  set min (min) { this.#min = min; }

  /** @type {number} */
  get max () { return this.#max; }
  set max (max) { this.#max = max; }

  /** @type {number} */
  get step () { return this.#step; }
  set step (step) { this.#step = step; }


  /**
   * @param {number} number
   * @returns {boolean}
   */
  includes (number) {
    return ((number >= this.min) && (number < this.max));
  }


  /**
   * @returns {Iterator<number>}
   */
  * [Symbol.iterator] () {
    let value = this.min;

    while (value < this.max) {
      yield value;
      value += this.step;
    }
  }
};
export default Range;
