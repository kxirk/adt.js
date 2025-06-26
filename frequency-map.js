/**
 * @template T
 * @extends Map
 */
const FrequencyMap = class extends Map /* <T, number> */ {
  /**
   * @param {number} value
   * @param {boolean} [valueIncluded]
   * @returns {T[]} keys
   */
  keysLess (value, valueIncluded = false) {
    return this.entries()
      .filter(([, v]) => (valueIncluded ? (v <= value) : (v < value)))
      .map(([k]) => k)
      .toArray();
  }

  /**
   * @param {number} value
   * @param {boolean} [valueIncluded]
   * @returns {T[]} keys
   */
  keysGreater (value, valueIncluded = false) {
    return this.entries()
      .filter(([, v]) => (valueIncluded ? (v >= value) : (v > value)))
      .map(([k]) => k)
      .toArray();
  }

  /**
   * @param {number} min
   * @param {number} max
   * @param {boolean} [minIncluded]
   * @param {boolean} [maxIncluded]
   * @returns {T[]} keys
   */
  keysBetween (min, max, minIncluded = true, maxIncluded = true) {
    return this.entries()
      .filter(([, v]) => ((minIncluded ? (v >= min) : (v > min)) && (maxIncluded ? (v <= max) : (v < max))))
      .map(([k]) => k)
      .toArray();
  }


  /** @type {number} */
  get valuesTotal () {
    return this.values().reduce((total, value) => (total + value));
  }

  /**
   * @param {T} key
   * @param {boolean} [keyIncluded]
   * @returns {number}
   */
  getCumulative (key, keyIncluded = true) {
    let total = 0;
    for (const [k, v] of this) {
      if (k === key) {
        if (keyIncluded) total += v;
        break;
      }

      total += v;
    }

    return total;
  }

  /**
   * @param {T} key
   * @returns {number}
   */
  getRelative (key) {
    return (this.get(key) / this.valuesTotal);
  }

  /**
   * @param {T} key
   * @param {boolean} [keyIncluded]
   * @returns {number}
   */
  getCumulativeRelative (key, keyIncluded) {
    return (this.getCumulative(key, keyIncluded) / this.valuesTotal);
  }


  /**
   * @returns {FrequencyMap<T>}
   */
  cumulative () {
    let total = 0;
    return new FrequencyMap(this.entries().map(([k, v]) => [k, (total += v)]));
  }

  /**
   * @param {number} [divisor]
   * @returns {FrequencyMap<T>}
   */
  relative (divisor = this.valuesTotal) {
    return new FrequencyMap(this.entries().map(([k, v]) => [k, (v / divisor)]));
  }

  /**
   * @param {number} [divisor]
   * @returns {FrequencyMap<T>}
   */
  cumulativeRelative (divisor) {
    return this.cumulative().relative(divisor);
  }
};
export default FrequencyMap;
