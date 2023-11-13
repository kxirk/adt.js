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
      configurable: true,
      enumerable: false
    });

    Object.defineProperty(record, "entries", {
      value () {
        return Object.entries(this);
      },
      configurable: true,
      enumerable: false
    });

    Object.defineProperty(record, "has", {
      value (key) {
        return (this[key] !== undefined);
      },
      configurable: true,
      enumerable: false
    });

    Object.defineProperty(record, "keys", {
      value () {
        return Object.keys(this);
      },
      configurable: true,
      enumerable: false
    });

    Object.defineProperty(record, "values", {
      value () {
        return Object.values(this);
      },
      configurable: true,
      enumerable: false
    });

    return record;
  }
};
export default Record;
