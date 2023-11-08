const Interval = class {
  /** @type {number} */
  #min;
  /** @type {number} */
  #max;

  /** @type {boolean} */
  #minIncluded;
  /** @type {boolean} */
  #maxIncluded;

  /** @type {number} */
  #step;

  /**
   * @param {number} [min]
   * @param {number} [max]
   * @param {boolean} [minIncluded]
   * @param {boolean} [maxIncluded]
   * @param {number} [step]
   */
  constructor (min = -Infinity, max = Infinity, minIncluded = true, maxIncluded = true, step = 1) {
    this.min = min;
    this.max = max;

    this.minIncluded = minIncluded;
    this.maxIncluded = maxIncluded;

    this.step = step;
  }


  /** @type {number} */
  get min () { return this.#min; }
  set min (min) { this.#min = min; }

  /** @type {number} */
  get max () { return this.#max; }
  set max (max) { this.#max = max; }


  /** @type {boolean} */
  get minIncluded () { return this.#minIncluded; }
  set minIncluded (minIncluded) { this.#minIncluded = minIncluded; }

  /** @type {boolean} */
  get maxIncluded () { return this.#maxIncluded; }
  set maxIncluded (maxIncluded) { this.#maxIncluded = maxIncluded; }


  /** @type {number} */
  get step () { return this.#step; }
  set step (step) { this.#step = step; }


  /**
   * @param {number} number
   * @returns {boolean}
   */
  includes (number) {
    const lower = (this.minIncluded ? (number >= this.min) : (number > this.min));
    const upper = (this.maxIncluded ? (number <= this.max) : (number < this.max));

    return (lower && upper);
  }


  /** @type {Function} */
  [Symbol.iterator] () {
    let value = this.minIncluded ? (this.min) : (this.min + this.step);

    return {
      next: () => {
        if ( this.maxIncluded ? (value <= this.max) : (value < this.max) ) {
          const result = { value, done: false };
          value += this.step;

          return result;
        }

        return { value, done: true };
      }
    };
  }
};
export default Interval;
