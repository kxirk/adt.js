const FrequencyMap = class extends Map /* <*, number> */ {
  /**
   * @returns {number}
   */
  get valuesTotal () {
    return Array.from(this.values()).reduce((total, value) => (total + value), 0);
  }


  /**
   * @param {*} key
   * @returns {number}
   */
  getRelative (key) {
    return this.get(key) / this.valuesTotal;
  }

  /**
   * @param {*} key
   * @param {boolean} [keyIncluded]
   * @returns {number}
   */
  getCumulative (key, keyIncluded = true) {
    let total = 0;
    for (const [keyThis, value] of this) {
      if (keyThis === key) {
        if (keyIncluded) total += value;
        break;
      }

      total += value;
    }

    return total;
  }

  /**
   * @param {*} key
   * @param {boolean} keyIncluded
   * @returns {number}
   */
  getCumulativeRelative (key, keyIncluded) {
    return this.getCumulative(key, keyIncluded) / this.valuesTotal;
  }


  /**
   * @param {number} value
   * @param {boolean} [valueIncluded]
   * @returns {*[]}
   */
  keysLess (value, valueIncluded = false) {
    const keys = [];

    for (const [key, valueThis] of this) {
      if ( (valueIncluded ? (valueThis <= value) : (valueThis < value)) ) keys.push(key);
    }

    return keys;
  }

  /**
   * @param {number} value
   * @param {boolean} [valueIncluded]
   * @returns {*[]}
   */
  keysGreater (value, valueIncluded = false) {
    const keys = [];

    for (const [key, valueThis] of this) {
      if ( (valueIncluded ? (valueThis >= value) : (valueThis > value)) ) keys.push(key);
    }

    return keys;
  }

  /**
   * @param {Range} [range]
   * @returns {*[]}
   */
  keysIncluded (range = []) {
    const keys = [];

    for (const [key, value] of this) {
      if ( range.includes(value) ) keys.push(key);
    }

    return keys;
  }


  /**
   * @param {number} [divisor]
   * @returns {FrequencyMap}
   */
  relative (divisor = this.valuesTotal) {
    const normalized = new FrequencyMap();

    for (const [key, value] of this) {
      normalized.set(key, (value / divisor));
    }

    return normalized;
  }

  /**
   * @returns {FrequencyMap}
   */
  cumulative () {
    const cumulative = new FrequencyMap();

    let acc = 0;
    for (const [key, value] of this) {
      acc += value;
      cumulative.set(key, acc);
    }

    return cumulative;
  }

  /**
   * @param {number} [divisor]
   * @returns {FrequencyMap}
   */
  cumulativeRelative (divisor = this.valuesTotal) {
    return this.cumulative().relative(divisor);
  }
};
export default FrequencyMap;
