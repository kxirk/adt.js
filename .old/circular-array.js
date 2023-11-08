const CircularArray = class extends Array {
  /**
   * @param {...*} elements
   */
  constructor (...elements) {
    super(...elements);

    return new Proxy(this, {
      get: (array, property) => {
        const propertyInt = Number.parseFloat(property);
        if ( Number.isInteger(propertyInt) ) {
          const length = array.length;
          const index = ((propertyInt % length) + length) % length;

          return array[index];
        }

        return array[property];
      }
    });
  }
};
export default CircularArray;
