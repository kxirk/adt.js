import Node from "./node.js";


const LinkedList = class {
  /** @type {Node} */
  #head;
  /** @type {Node} */
  #tail;
  /** @type {number} */
  #length;

  constructor () {
    this.#head = null;
    this.#tail = null;
    this.#length = 0;
  }


  /** @type {number} */
  get length () { return this.#length; }


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
    if ((this.length === 0) || (index > this.length - 1)) return null;

    let removed;
    if (index === 0) {
      removed = this.#head;

      if (removed.next === null) this.#tail = removed.next;
      this.#head = removed.next;
    }
    else if (index === this.length - 1) {
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
    this.#length--;

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
  insert (data, index = this.length) {
    if (index > this.length) return this.length;

    const node = new Node(data);
    if (this.length === 0) {
      this.#head = node;
      this.#tail = node;
    }
    else if (index === 0) {
      node.next = this.#head;
      this.#head = node;
    }
    else if (index === this.length) {
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

    return ++this.#length;
  }


  /**
   * @param {...*} elements
   * @returns {number}
   * @complexity O(1)
   */
  push (...elements) {
    for (const element of elements) {
      this.insert(element, this.length);
    }

    return this.length;
  }

  /**
   * @returns {*}
   * @complexity O(1)
   */
  pop () {
    return this.remove(this.length - 1);
  }

  /**
   * @returns {*}
   * @complexity O(1)
   */
  shift () {
    return this.remove(0);
  }

  /**
   * @param {...*} elements
   * @returns {number}
   * @complexity O(1)
   */
  unshift (...elements) {
    for (const element of elements.reverse()) {
      this.insert(element, 0);
    }

    return this.length;
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
