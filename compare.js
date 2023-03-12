/**
 * @param {number} a
 * @param {number} b
 * @returns {boolean}
 */
export const min = (a, b) => (a < b);

/**
 * @param {number} a
 * @param {number} b
 * @returns {boolean}
 */
export const max = (a, b) => (a > b);


/** @enum {Function} */
const Compare = class {
  static min = min;
  static max = max;
};


export default Compare;
