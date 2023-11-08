import Node from "./node.js";


const LinkedList = class {
  /** @type {Node} */
  #head;
  /** @type {Node} */
  #tail;
  /** @type {number} */
  #size;

  constructor () {
    this.clear();
  }


  /** @type {number} */
  get size () { return this.#size; }

  /** @type {number} */
  get #lastIndex () {
    return (this.size - 1);
  }


  /**
   * @param {number} index
   * @returns {Node}
   * @complexity O(N)
   */
  #getNode (index) {
    let node = this.#head;

    let i = index;
    while (i--) node = node?.next;

    return node;
  }

  /**
   * @param {number} index
   * @returns {*}
   * @complexity O(N)
   */
  get (index) {
    return this.#getNode(index)?.data;
  }

  /**
   * @param {number} index
   * @returns {Node}
   * @complexity O(N)
   */
  #removeNode (index) {
    if ((this.size === 0) || (index > this.#lastIndex)) return null;

    let removed;
    if (index === 0) {
      removed = this.#head;

      if (removed.next === null) this.#tail = removed.next;
      this.#head = removed.next;
    }
    else if (index === this.#lastIndex) {
      const prev = this.#getNode(index - 1);
      removed = this.#tail;

      prev.next = null;
      this.#tail = prev;
    }
    else {
      const prev = this.#getNode(index - 1);

      removed = prev.next;
      const next = removed.next;

      prev.next = next;
    }
    this.#size--;

    return removed;
  }

  /**
   * @param {number} index
   * @returns {*}
   * @complexity O(N)
   */
  remove (index) {
    return this.#removeNode(index)?.data;
  }

  /**
   * @param {*} data
   * @param {number} [index]
   * @returns {number}
   * @complexity O(N)
   */
  insert (data, index = this.size) {
    if (index > this.size) return this.size;

    const node = new Node(data);
    if (this.size === 0) {
      this.#head = node;
      this.#tail = node;
    }
    else if (index === 0) {
      node.next = this.#head;
      this.#head = node;
    }
    else if (index === this.size) {
      const prev = this.#tail;

      prev.next = node;
      this.#tail = node;
    }
    else {
      const prev = this.#getNode(index - 1);
      const next = prev.next;

      prev.next = node;
      node.next = next;
    }

    return ++this.#size;
  }


  /**
   * @param {...*} data
   * @returns {number}
   * @complexity O(1)
   */
  push (...data) {
    for (const element of data) {
      this.insert(element, this.size);
    }

    return this.size;
  }

  /**
   * @returns {*}
   * @complexity O(1)
   */
  pop () {
    return this.remove(this.#lastIndex);
  }

  /**
   * @returns {*}
   * @complexity O(1)
   */
  shift () {
    return this.remove(0);
  }

  /**
   * @param {...*} data
   * @returns {number}
   * @complexity O(1)
   */
  unshift (...data) {
    for (const element of data.reverse()) {
      this.insert(element, 0);
    }

    return this.size;
  }

  /**
   * @returns {undefined}
   * @complexity O(1)
   */
  clear () {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
  }


  /** @type {Function} */
  [Symbol.iterator] () {
    let next = new Node(null, this.#head);

    return {
      next: () => {
        next = next.next;

        return {
          done: next === null,
          value: next?.data
        };
      }
    };
  }
};
export default LinkedList;
