const Heap = class {
  /** @type {*[]} */
  #contents;
  /** @type {Function} */
  #comparator;
  /** @type {Function} */
  #sorter;

  /**
   * @param {Function} comparator
   * @param {Function} sorter
   */
  constructor (comparator, sorter) {
    this.#contents = [];
    this.#comparator = comparator;
    this.#sorter = sorter;
  }


  /** @type {*} */
  get next () {
    return this.#contents[0];
  }

  /** @type {number} */
  get length () {
    return this.#contents.length;
  }

  /** @type {boolean} */
  get empty () {
    return (this.length === 0);
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
   * @returns {undefined}
   */
  #percolateUp () {
    let currentIndex = (this.length - 1);
    while (
      (currentIndex > Heap.#rootIndex)
      && this.#compare(currentIndex, Heap.#parentIndex(currentIndex))
    ) {
      this.#swap(currentIndex, Heap.#parentIndex(currentIndex));
      currentIndex = Heap.#parentIndex(currentIndex);
    }
  }

  /**
   * @returns {undefined}
   */
  #percolateDown () {
    let currentIndex = Heap.#rootIndex;
    while (
      (
        (Heap.#leftIndex(currentIndex) < this.length)
        && this.#compare(Heap.#leftIndex(currentIndex), currentIndex)
      )
      || (
        (Heap.#rightIndex(currentIndex) < this.length)
        && this.#compare(Heap.#rightIndex(currentIndex), currentIndex)
      )
    ) {
      const maxChildIndex = (
        (Heap.#rightIndex(currentIndex) < this.length)
        && (this.#compare(Heap.#rightIndex(currentIndex), Heap.#leftIndex(currentIndex)))
      )
        ? Heap.#rightIndex(currentIndex)
        : Heap.#leftIndex(currentIndex);

      this.#swap(currentIndex, maxChildIndex);
      currentIndex = maxChildIndex;
    }
  }

  /**
   * @param {...*} elements
   * @returns {number}
   * @complexity O(logN)
   */
  insert (...elements) {
    for (const element of elements) {
      this.#contents.push(element);
      this.#percolateUp();
    }

    return this.length;
  }

  /**
   * @returns {undefined}
   * @complexity O(logN)
   */
  update () {
    this.#percolateDown();
  }

  /**
   * @returns {*}
   * @complexity O(logN)
   */
  remove () {
    const element = this.next;

    const bottomIndex = (this.length - 1);
    if (bottomIndex > Heap.#rootIndex) {
      this.#swap(Heap.#rootIndex, bottomIndex);
    }

    this.#contents.pop();
    this.#percolateDown();

    return element;
  }


  /** @type {Function} */
  [Symbol.iterator] () {
    const array = [...this.#contents].sort(this.#sorter);

    return array[Symbol.iterator]();
  }
};


export default Heap;
