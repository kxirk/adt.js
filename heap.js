const Heap = class {
  /** @type {*[]} */
  #contents;
  /** @type {Function} */
  #comparator;
  /** @type {Function} */
  #sorter;

  /**
   * @param {Function} comparator
   * @param {Function} [sorter]
   */
  constructor (comparator, sorter = comparator) {
    this.#contents = [];
    this.#comparator = comparator;
    this.#sorter = sorter;
  }


  /** @type {*} */
  get next () {
    return this.#contents[0];
  }

  /** @type {number} */
  get size () {
    return this.#contents.length;
  }

  /** @type {number} */
  get #lastIndex () {
    return (this.size - 1);
  }

  /** @type {boolean} */
  get empty () {
    return (this.size === 0);
  }


  /** @type {number} */
  static get #rootIndex () {
    return 0;
  }

  /**
   * @param {number} index
   * @returns {number}
   */
  static #leftIndex (index) {
    return (index * 2) + 1;
  }

  /**
   * @param {number} index
   * @returns {number}
   */
  static #rightIndex (index) {
    return (index * 2) + 2;
  }

  /**
   * @param {number} index
   * @returns {number}
   */
  static #parentIndex (index) {
    return Math.floor((index - 1) / 2);
  }


  /**
   * @param {number} a
   * @param {number} b
   * @returns {boolean}
   */
  #compare (a, b) {
    return this.#comparator(this.#contents[a], this.#contents[b]);
  }

  /**
   * @param {number} a
   * @param {number} b
   * @returns {Heap}
   */
  #swap (a, b) {
    [this.#contents[a], this.#contents[b]] = [this.#contents[b], this.#contents[a]];

    return this;
  }

  /**
   * @param {number} index
   * @returns {undefined}
   */
  #percolateUp (index) {
    let current = index;
    while (
      (current > Heap.#rootIndex)
      && this.#compare(current, Heap.#parentIndex(current))
    ) {
      this.#swap(current, Heap.#parentIndex(current));
      current = Heap.#parentIndex(current);
    }
  }

  /**
   * @param {number} index
   * @returns {undefined}
   */
  #percolateDown (index) {
    let current = index;
    while (
      (
        (Heap.#leftIndex(current) < this.size)
        && this.#compare(Heap.#leftIndex(current), current)
      )
      || (
        (Heap.#rightIndex(current) < this.size)
        && this.#compare(Heap.#rightIndex(current), current)
      )
    ) {
      const childIndex = (
        (Heap.#rightIndex(current) < this.size)
        && (this.#compare(Heap.#rightIndex(current), Heap.#leftIndex(current)))
      )
        ? Heap.#rightIndex(current)
        : Heap.#leftIndex(current);

      this.#swap(current, childIndex);
      current = childIndex;
    }
  }

  /**
   * @param {...*} elements
   * @returns {number}
   * @complexity O(logN)
   */
  add (...elements) {
    for (const element of elements) {
      this.#contents.push(element);
      this.#percolateUp(this.#lastIndex);
    }

    return this.size;
  }

  /**
   * @returns {undefined}
   * @complexity O(logN)
   */
  update () {
    this.#percolateDown(Heap.#rootIndex);
  }

  /**
   * @returns {*}
   * @complexity O(logN)
   */
  remove () {
    const element = this.next;

    if (this.#lastIndex > Heap.#rootIndex) {
      this.#swap(Heap.#rootIndex, this.#lastIndex);
    }
    this.#contents.pop();
    this.#percolateDown(Heap.#rootIndex);

    return element;
  }

  /**
   * @returns {undefined}
   * @complexity O(1)
   */
  clear () {
    this.#contents.length = 0;
  }


  /** @type {Iterator<*>} */
  [Symbol.iterator] () {
    const array = [...this.#contents].sort(this.#sorter);

    return array[Symbol.iterator]();
  }
};
export default Heap;
