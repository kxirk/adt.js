const Record = class {
  /**
   * @param {Object} [object]
   */
  constructor (object = {}) {
    return Object.setPrototypeOf(Object.assign(object), null);
  }
};


export default Record;
