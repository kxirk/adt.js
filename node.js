/**
 * @template T
 */
const Node = class {
  /** @type {T} */ #data;
  /** @type {Node<T>} */ #next;

  /**
   * @param {T} data
   * @param {?Node<T>} [next]
   */
  constructor (data, next = null) {
    this.#data = data;
    this.#next = next;
  }


  /** @type {T} */
  get data () { return this.#data; }
  set data (data) { this.#data = data; }

  /** @type {Node<T>} */
  get next () { return this.#next; }
  set next (node) { this.#next = node; }
};
export default Node;
