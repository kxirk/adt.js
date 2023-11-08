const Record = class {
  /**
   * @param {Object} [object]
   */
  constructor (object = {}) {
    const record = Object.setPrototypeOf(Object.assign(object), null);

    Object.defineProperty(record, "size", {
      get () {
        return this.keys().length;
      },
      enumerable: false
    });

    Object.defineProperty(record, "entries", {
      value () {
        return Object.entries(this);
      },
      enumerable: false
    });

    Object.defineProperty(record, "has", {
      value (key) {
        return (this[key] !== undefined);
      },
      enumerable: false
    });

    Object.defineProperty(record, "keys", {
      value () {
        return Object.keys(this);
      },
      enumerable: false
    });

    Object.defineProperty(record, "values", {
      value () {
        return Object.values(this);
      },
      enumerable: false
    });

    return record;
  }
};
export default Record;
