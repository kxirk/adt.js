const Matrix = class extends Array {
  /**
   * @param {number} [height]
   * @param {number} [width]
   */
  constructor (height = 0, width = 0) {
    super(height);

    this.height = height;
    this.width = width;
  }


  /** @type {number} */
  get height () { return this.length; }
  set height (height) {
    this.length = height;
    for (let y = 0; y < height; y++) {
      this[y] ??= [];
      this[y].length = this.width;
    }
  }

  /** @type {number} */
  get width () { return (this[0]?.length ?? 0); }
  set width (width) {
    for (let y = 0; y < this.height; y++) {
      this[y].length = width;
    }
  }


  /**
   * @param {number} y
   * @param {number} x
   * @returns {*}
   */
  at (y, x) {
    return super.at(y).at(x);
  }

  /** @typedef {number[]} Position [y, x] */
  /**
   * @param {*} value
   * @param {Position} [start]
   * @param {Position} [end]
   * @returns {Matrix}
   */
  fill (value, start = [0, 0], end = [this.height, this.width]) {
    for (let y = start[0]; y < end[0]; y++) {
      this[y].fill(value, start[1], end[1]);
    }
    return this;
  }
};
export default Matrix;
