const TokenBucket = class {
  /** @type {number} */
  #rate;
  /** @type {number} */
  #per;

  /** @type {number} */
  #last;
  /** @type {number} */
  #allowance;

  /**
   * @param {number} rate
   * @param {number} per
   * @param {number} [last]
   */
  constructor (rate, per, last = 0) {
    this.rate = rate;
    this.per = per;

    this.last = last;
    this.allowance = rate;
  }


  /** @type {number} */
  get rate () { return this.#rate; }
  set rate (rate) { this.#rate = rate; }

  /** @type {number} */
  get per () { return this.#per; }
  set per (per) { this.#per = per; }


  /** @type {number} */
  get last () { return this.#last; }
  set last (last) { this.#last = last; }

  /** @type {number} */
  get allowance () { return this.#allowance; }
  set allowance (allowance) {
    this.#allowance = Math.max(0, Math.min(allowance, this.rate));
  }


  /** @type {number} */
  get utilization () {
    return (this.rate - this.allowance) / this.rate;
  }


  /**
   * @param {number} current
   * @returns {boolean}
   */
  next (current) {
    const passed = (current - this.last);

    this.last = current;
    this.allowance += (passed * (this.rate / this.per));

    const allowed = (this.allowance >= 1);
    if (allowed) this.allowance--;

    return allowed;
  }
};


export default TokenBucket;
