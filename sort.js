/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export const ascending = (a, b) => (a - b);

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export const descending = (a, b) => (b - a);


/** @enum {Function} */
const Sort = class {
  static ascending = ascending;
  static descending = descending;
};


export default Sort;
