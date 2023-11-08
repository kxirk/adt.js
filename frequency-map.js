const FrequencyMap = class extends Map {
  /**
   * @returns {number}
   */
  get valuesTotal () {
    return Array.from(this.values()).reduce((acc, value) => (acc + value), 0);
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
    let cumulative = 0;
    for (const [keyThis, value] of this) {
      if (keyThis === key) {
        if (keyIncluded) return (cumulative + value);
        return cumulative;
      }

      cumulative += value;
    }
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
  keysLessThan (value, valueIncluded = false) {
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
  keysGreaterThan (value, valueIncluded = false) {
    const keys = [];

    for (const [key, valueThis] of this) {
      if ( (valueIncluded ? (valueThis >= value) : (valueThis > value)) ) keys.push(key);
    }

    return keys;
  }

  /**
   * @param {Interval} [interval]
   * @returns {*[]}
   */
  keysOnInterval (interval = []) {
    const keys = [];

    for (const [key, value] of this) {
      if ( interval.includes(value) ) keys.push(key);
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
};
export default FrequencyMap;
